'use server';

import { eq } from 'drizzle-orm';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { db } from '@/lib/drizzle';
import { hashPassword } from '@/lib/hash';
import { inngest } from '@/lib/inngest';
import { redis } from '@/lib/redis';
import { actionClient } from '@/lib/safe-action';
import { generateRandomOTP } from '@/utils/crypto';
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
    email?: string;
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

      const normalizedEmail = email.toLowerCase().trim();
      const code = generateRandomOTP();

      await redis.hset(`signup:${normalizedEmail}`, {
        email: normalizedEmail,
        password: passwordHash,
        otp: code,
      });

      await redis.expire(`signup:${normalizedEmail}`, 15 * 60); // 15 minutes

      inngest.send({
        name: 'app/email.verification',
        data: {
          email: normalizedEmail,
          code,
        },
      });

      return { email: normalizedEmail };
    } catch {
      return { global: 'Something went wrong, please try again' };
    }
  });
