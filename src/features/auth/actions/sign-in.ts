'use server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { db } from '@/lib/drizzle';
import { verifyPassword } from '@/lib/hash';
import { actionClient } from '@/lib/safe-action';
import { userTable } from '../../../../drizzle/schema';
import generateSessionToken from '../../../utils/crypto';
import { createSession } from '../utils/session';
import { setSessionCookie } from '../utils/session-cookies';

const signInSchmea = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().max(191)),
  rememberMe: zfd.checkbox().optional(),
});

export const signInAction = actionClient
  .metadata({ actionName: 'signInAction' })
  .schema(signInSchmea, {
    handleValidationErrorsShape: async ve =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .stateAction<{
    validationErrors?: Partial<Record<'email' | 'password', string[]>>;
    values?: { email?: string; rememberMe?: boolean };
    global?: string;
  }>(async ({ parsedInput: { email, password, rememberMe } }) => {
    try {
      const [findUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));
      if (!findUser) {
        return {
          validationErrors: {
            email: ['Either email or password is incorrect'],
          },
          values: { email },
        };
      }
      const isPasswordValid = await verifyPassword(
        password,
        findUser.passwordHash
      );
      if (!isPasswordValid) {
        return {
          validationErrors: {
            password: ['Either email or password is incorrect'],
          },
          values: { email },
        };
      }
      const sessionToken = generateSessionToken();
      const session = await createSession(
        sessionToken,
        findUser.id,
        rememberMe
      );
      console.log('Session created:', session);
      await setSessionCookie(sessionToken, session.expiresAt);
    } catch {
      return {
        global: 'Something went wrong, please try again',
      };
    }
    redirect('/chat');
  });
