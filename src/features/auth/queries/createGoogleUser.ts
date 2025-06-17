'use server';

import { db } from '@/lib/drizzle';
import { userTable } from '../../../../drizzle/schema';

export const createGoogleUser = async (googleId: string, email: string) => {
  if (!googleId || !email) {
    throw new Error('Google ID and email are required to create a user.');
  }

  const newUser = await db
    .insert(userTable)
    .values({
      googleId,
      email,
      passwordHash: '',
    })
    .returning({ id: userTable.id });
  return newUser[0];
};
