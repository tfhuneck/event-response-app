import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SESSION_SECRET });
  const currentUser = req.cookies.get('currentUser')?.value

  if (!currentUser && !req.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', req.url))
  }
  
  // If there is no token, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin(.*)",
};