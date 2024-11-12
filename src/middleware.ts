import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '../lib';
// import { verifyJWT } from '../lib';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  const { pathname } = req.nextUrl;
  const isLoginRequest = pathname === '/login';

  if (!token && !isLoginRequest) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const payload = await verifyJWT(token);

    if (payload) {
      if (isLoginRequest)
        return NextResponse.redirect(new URL('/dashboard', req.url));
      return NextResponse.next();
    } else if (!isLoginRequest)
      return NextResponse.redirect(new URL('/login', req.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*'],
};
