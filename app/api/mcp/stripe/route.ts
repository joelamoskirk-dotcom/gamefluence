import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

const SERVER_PATH = path.join(process.cwd(), 'stripe_mcp_server.py');

// Allowed tool names — reject anything not on this list
const ALLOWED_TOOLS = [
  'create_test_customer',
  'create_test_product',
  'simulate_payment',
];

// In-memory rate limiter per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now > record.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

interface MCPRequest {
  tool: string;
  arguments: Record<string, unknown>;
}

// Spawn the Python MCP server, do the full handshake, call the tool, return result
async function callMCPServer(toolName: string, args: Record<string, unknown>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const TIMEOUT_MS = 10_000;

    // Only pass required env vars to the subprocess
    const safeEnv: Record<string, string> = {};
    for (const key of ['PATH', 'HOME', 'NODE_ENV', 'STRIPE_SECRET_KEY']) {
      if (process.env[key]) safeEnv[key] = process.env[key] as string;
    }

    const proc = spawn('python3', [SERVER_PATH], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: safeEnv as NodeJS.ProcessEnv,
    });

    const timeout = setTimeout(() => {
      proc.kill('SIGTERM');
      reject(new Error('MCP server timed out'));
    }, TIMEOUT_MS);

    let stdout = '';
    let stderr = '';
    const responses: unknown[] = [];

    proc.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
      const lines = stdout.split('\n');
      stdout = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          responses.push(JSON.parse(line));
        } catch {
          // ignore parse errors on partial lines
        }
      }
    });

    proc.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    proc.on('close', () => {
      clearTimeout(timeout);

      const callResponse = responses.find(
        (r: any) => r.id === 2
      ) as any;

      if (!callResponse) {
        reject(new Error('No tool response received'));
        return;
      }

      if (callResponse.error) {
        reject(new Error(callResponse.error.message ?? JSON.stringify(callResponse.error)));
        return;
      }

      const content = callResponse.result?.content?.[0]?.text;
      if (!content) {
        reject(new Error('Empty content in MCP response'));
        return;
      }

      try {
        resolve(JSON.parse(content));
      } catch {
        resolve(content);
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to spawn MCP server: ${err.message}`));
    });

    const messages = [
      JSON.stringify({
        jsonrpc: '2.0',
        id: 0,
        method: 'initialize',
        params: { protocolVersion: '2024-11-05', capabilities: {} },
      }),
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'notifications/initialized',
        params: {},
      }),
      JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: { name: toolName, arguments: args },
      }),
    ];

    proc.stdin.write(messages.join('\n') + '\n');
    proc.stdin.end();
  });
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://gamefluence.ai',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { status: 429 }
    );
  }

  // Require founder session cookie for payment operations
  const sessionCookie = req.cookies.get('founder_session')?.value;
  if (!sessionCookie) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const body: MCPRequest = await req.json();

    if (!body.tool || !body.arguments) {
      return NextResponse.json({ error: 'Missing tool or arguments' }, { status: 400 });
    }

    // Validate tool name against allowlist
    if (!ALLOWED_TOOLS.includes(body.tool)) {
      return NextResponse.json({ error: 'Invalid tool name' }, { status: 400 });
    }

    const result = await callMCPServer(body.tool, body.arguments);

    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://gamefluence.ai',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Log full error server-side, return generic message to client
    console.error('[MCP Bridge]', message);
    return NextResponse.json(
      { error: 'Payment processing failed. Please try again.' },
      { status: 500 }
    );
  }
}
