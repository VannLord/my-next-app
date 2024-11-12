import http from '@components/config/axios.config';
import { SignJWT } from 'jose';
import { key, secretKey } from '../constant/crypt';

// import { SignJWT } from 'jose';

export async function loginSP(formData: FormData) {
  const payload = {
    username: formData.get('email') || 'admin',
    password: formData.get('password') || 'LP123456',
  };
  console.log('🚀 ~ loginSP ~ payload:', payload);

  const res = await http.post('auth/login', payload);

  const authToken = res?.data?.data?.auth_token;
  if (authToken) {
    const encryptedToken = await new SignJWT({ authToken })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(key);
    console.log('🚀 ~ loginSP ~ encryptedToken:', encryptedToken);

    document.cookie = `auth_token=${encryptedToken}; path=/; secure; SameSite=Strict`;
  }
  return res.data;
}
