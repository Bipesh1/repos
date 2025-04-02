import { cookies } from 'next/headers';

export default async function getToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('refreshToken')?.value;
  return token
  }
