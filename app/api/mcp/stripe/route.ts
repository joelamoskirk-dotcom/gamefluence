import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

const SERVER_PATH = path.join(process.cwd(), 'stripe_mcp_server.py');

interface MCPRequest {
  tool: string;
  arguments: Record<string, unknown>;
}

// Spawn the Python MCP server, do the full handshake, call the tool, return result
async function callMCPServer(toolName: string, args: Record<string, unknown>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const proc = spawn('python3', [SERVER_PATH], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    const responses: unknown[] = [];

    proc.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
      // Parse each newline-delimited JSON response
      const lines = stdout.split('\n');
      stdout = lines.pop() ?? ''; // keep incomplete line
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
      // Find the tools/call response (id: 2)
      const callResponse = responses.find(
        (r: any) => r.id === 2
      ) as any;

      if (!callResponse) {
        reject(new Error(`No tool response received. stderr: ${stderr}`));
        return;
      }

      if (callResponse.error) {
        reject(new Error(callResponse.error.message ?? JSON.stringify(callResponse.error)));
        return;
      }

      // Extract text content from MCP response
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
      reject(new Error(`Failed to spawn MCP server: ${err.message}`));
    });

    // Send: initialize → notifications/initialized → tools/call
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

export async function POST(req: NextRequest) {
  try {
    const body: MCPRequest = await req.json();

    if (!body.tool || !body.arguments) {
      return NextResponse.json({ error: 'Missing tool or arguments' }, { status: 400 });
    }

    const result = await callMCPServer(body.tool, body.arguments);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[MCP Bridge]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
