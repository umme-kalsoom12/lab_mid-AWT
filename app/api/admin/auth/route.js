import { NextResponse } from 'next/server';

export async function POST(request) {
  // Validate against .env ADMIN_EMAIL and ADMIN_PASSWORD
  return NextResponse.json({ message: 'Auth endpoint' });
}