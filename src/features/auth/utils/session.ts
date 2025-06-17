import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { sessionTable, userTable } from '../../../../drizzle/schema';
import type { Session, User } from '../../../../drizzle/schema';

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days
const SESSION_REFRESH_DURATION = 1000 * 60 * 60 * 24 * 14; // 14 days
const SESSION_REMEMBER_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days

export async function createSession(
  token: string,
  userId: number,
  rememberMe?: boolean
) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(
      Date.now() + (rememberMe ? SESSION_REMEMBER_DURATION : SESSION_DURATION)
    ),
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSession(token: string, rememberMe?: boolean) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
    return { session: null, user: null };
  }

  if (
    Date.now() >=
    session.expiresAt.getTime() -
      (rememberMe ? SESSION_REMEMBER_DURATION : SESSION_DURATION)
  ) {
    session.expiresAt = new Date(Date.now() + SESSION_REFRESH_DURATION);
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, sessionId));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export type SessionResult =
  | { session: Session; user: User }
  | { session: null; user: null };
