import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (req.nextUrl.pathname === '/') {
    if (session) {
      // Redirect authenticated users away from the root path
      return NextResponse.redirect(new URL('/home', req.url));
    }
    // Allow unauthenticated users to access the root path
    return res;
  }

  // For all other routes, require authentication
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
};