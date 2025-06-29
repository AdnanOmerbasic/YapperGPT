'use server';

import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { db } from '@/lib/drizzle';
import { redis } from '@/lib/redis';
import { actionClient } from '@/lib/safe-action';
import generateSessionToken from '@/utils/crypto';
import { chatListPath } from '@/utils/paths';
import { userTable } from '../../../../drizzle/schema';
import { createSession } from '../utils/session';
import { setSessionCookie } from '../utils/session-cookies';

const confirmSignUpSchema = zfd.formData({
  otp: zfd.text(z.string().min(6).max(6)),
});

export const confirmSignUpAction = actionClient
  .metadata({ actionName: 'confirmSignUpAction' })
  .schema(confirmSignUpSchema, {
    handleValidationErrorsShape: async ve =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .bindArgsSchemas<[email: z.ZodString]>([z.string().email()])
  .stateAction<{
    validationErrors?: Partial<Record<'otp', string[]>>;
    global?: string;
  }>(async ({ parsedInput: { otp }, bindArgsParsedInputs: [email] }) => {
    try {
      const data =
        (await redis.hgetall(`signup:${email.toLowerCase().trim()}`)) || {};

      if (typeof data.email !== 'string' || typeof data.password !== 'string') {
        return {
          global: 'Invalid or expired signup session',
        };
      }
      if (otp !== data.otp) {
        return {
          validationErrors: {
            otp: ['Invalid OTP'],
          },
        };
      }

      const [user] = await db
        .insert(userTable)
        .values({
          email: data.email,
          passwordHash: data.password,
        })
        .returning();

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);
      await setSessionCookie(sessionToken, session.expiresAt);
      await redis.del(`signup:${email.toLowerCase()}`);
    } catch {
      return { global: 'Something went wrong, please try again' };
    }
    redirect(chatListPath());
  });
