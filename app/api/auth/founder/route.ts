import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Server-side founder authentication
// Credentials are read from environment variables, never exposed to the client

const FOUNDER_USERNAME = process.env.FOUNDER_USERNAME || '';
const FOUNDER_PASSWORD = process.env.FOUNDER_PASSWORD || '';
const FOUNDER_MASTER_KEY = process.env.FOUNDER_MASTER_KEY || '';

// Simple in-memory rate limiter for auth attempts
const authAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = authAttempts.get(ip);

  if (!record || now > record.resetAt) {
    authAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  return true;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Compare against self to keep constant time, then return false
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// In-memory session store (use Redis/DB in production)
const sessions = new Map<string, { userId: string; createdAt: number; expiresAt: number }>();
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      { status: 429 }
    );
  }

  // Verify env vars are configured
  if (!FOUNDER_USERNAME || !FOUNDER_PASSWORD || !FOUNDER_MASTER_KEY) {
    console.error('Founder credentials not configured in environment variables');
    return NextResponse.json(
      { error: 'Authentication service unavailable' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { username, password, masterKey } = body;

    if (!username || !password || !masterKey) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const isValid =
      timingSafeEqual(username, FOUNDER_USERNAME) &&
      timingSafeEqual(password, FOUNDER_PASSWORD) &&
      timingSafeEqual(masterKey, FOUNDER_MASTER_KEY);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid founder credentials. Access denied.' },
        { status: 401 }
      );
    }

    // Generate session
    const token = generateSessionToken();
    const now = Date.now();
    sessions.set(token, {
      userId: 'founder',
      createdAt: now,
      expiresAt: now + SESSION_TTL,
    });

    // Set HTTP-only secure cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('founder_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Session validation endpoint
export async function GET(req: NextRequest) {
  const token = req.cookies.get('founder_session')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = sessions.get(token);
  if (!session || Date.now() > session.expiresAt) {
    sessions.delete(token || '');
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    userId: session.userId,
    expiresAt: session.expiresAt,
  });
}

// Logout
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('founder_session')?.value;
  if (token) {
    sessions.delete(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('founder_session');
  return response;
}
