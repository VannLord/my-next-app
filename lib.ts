import { key } from '@components/app/constant/crypt';
import http from '@components/config/axios.config';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';
const cryptAlgor = 'HS256';

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: cryptAlgor })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: [cryptAlgor],
  });
  return payload;
}

export async function login(formData: FormData) {
  const user = { email: formData.get('email'), name: 'Ldz' };

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('sessi¡ons')?.value;
  if (!session) return;

  //Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}

export async function verifyJWT(token: any) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: [cryptAlgor],
    });
    console.log('Verified payload:', payload);
    return payload; // Use payload as needed
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
