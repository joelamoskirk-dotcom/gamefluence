import { NextRequest, NextResponse } from 'next/server';

// Routes that require founder authentication
const PROTECTED_ROUTES = [
  '/admin',
  '/dashboard',
  '/batch-campaign',
  '/campaigns',
  '/agency-demo',
  '/thailand-demo',
  '/emergency-access',
  '/logo-test',
  '/pricing',
];

// Routes that are always public (marketing site)
const PUBLIC_ROUTES = [
  '/',
  '/founder',
  '/beta',
  '/creators',
  '/news',
  '/privacy',
  '/terms',
  '/refund',
  '/creator-signup',
  '/get-started',
  '/about',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Protected API routes (internal/confidential endpoints)
  const PROTECTED_API_ROUTES = ['/api/call-script-pdf'];
  const isProtectedApi = PROTECTED_API_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    const sessionCookie = req.cookies.get('founder_session')?.value;
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    return NextResponse.next();
  }

  // Skip other API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if route is explicitly public
  const isPublic = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Everything else requires founder auth
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtected) {
    const sessionCookie = req.cookies.get('founder_session')?.value;

    if (!sessionCookie) {
      // Redirect to founder login
      const loginUrl = new URL('/founder', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
