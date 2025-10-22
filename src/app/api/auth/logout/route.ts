import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const COOKIE_NAME = 'auth_token';

export async function POST() {
  // To log out, we clear the cookie by setting its maxAge to -1
  const cookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0), // Set expiry to a date in the past
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
  response.headers.set('Set-Cookie', cookie);

  return response;
}
