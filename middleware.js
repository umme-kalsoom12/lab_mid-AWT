// Protect /admin routes by checking for the admin_session HTTP-only cookie
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Implementation here
}

export const config = {
  matcher: '/admin/:path*',
};