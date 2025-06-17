'use server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { userTable } from '../../../../drizzle/schema';

export const getUserFromGoogleId = async (googleId: string) => {
  const [result] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.googleId, googleId));

  return result ?? null;
};
