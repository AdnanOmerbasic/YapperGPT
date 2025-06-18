'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { createSession } from '@/features/auth/utils/session';
import { setSessionCookie } from '@/features/auth/utils/session-cookies';
import { db } from '@/lib/drizzle';
import { hashPassword } from '@/lib/hash';
import { actionClient } from '@/lib/safe-action';
import generateSessionToken from '@/utils/crypto';
import { userTable } from '../../../../drizzle/schema';

const signUpSchema = zfd.formData({
  email: zfd.text(z.string().min(1).email().max(191)),
  password: zfd.text(z.string().min(8).max(191)),
  confirmPassword: zfd.text(z.string().min(8).max(191)),
});

export const signUpAction = actionClient
  .metadata({ actionName: 'signUpAction' })
  .schema(signUpSchema, {
    handleValidationErrorsShape: async ve =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .stateAction<{
    validationErrors?: Partial<
      Record<'email' | 'password' | 'confirmPassword', string[]>
    >;
    values?: { email?: string };
    global?: string;
  }>(async ({ parsedInput: { email, password, confirmPassword } }) => {
    try {
      const [findUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

      if (findUser) {
        return {
          validationErrors: {
            email: ['Email already exists'],
          },
          values: { email },
        };
      }

      if (password !== confirmPassword) {
        return {
          validationErrors: {
            confirmPassword: ['Passwords do not match'],
          },
          values: { email },
        };
      }
      const passwordHash = await hashPassword(password);

      const normalizedEmail = email.toLowerCase();
      const [newUser] = await db
        .insert(userTable)
        .values({
          email: normalizedEmail,
          passwordHash,
        })
        .returning();

      //TODO: Send Mail
      const token = generateSessionToken();
      const session = await createSession(token, newUser.id);
      await setSessionCookie(token, session.expiresAt);
    } catch {
      return { global: 'Something went wrong, please try again' };
    }

    redirect('/chat');
  });
