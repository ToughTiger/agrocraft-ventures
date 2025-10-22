import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/queries';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
const COOKIE_NAME = 'auth_token';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const user = await getUserByEmail(email);

    // In a real app, you would compare a hashed password.
    // For this mock setup, we do a simple string comparison.
    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }
    
    // Don't include sensitive info in the token payload
    const payload = { sub: user.id, email: user.email, name: user.name };
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    const cookie = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    const response = NextResponse.json({ message: 'Login successful.' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie);

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
