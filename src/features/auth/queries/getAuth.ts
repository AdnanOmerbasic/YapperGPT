import { cookies } from 'next/headers';
import { cache } from 'react';
import { validateSession } from '../utils/session';

export const getAuth = cache(async () => {
  const token = (await cookies()).get('session')?.value ?? null;
  if (!token) {
    return {
      user: null,
      session: null,
    };
  }

  return validateSession(token);
});
