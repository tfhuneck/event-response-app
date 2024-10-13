import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SESSION_SECRET });
  
  // If there is no token, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin(.*)",
};