import { inngest } from '@/lib/inngest';
import { sendEmailVerification } from '../emails/email-verification';

export type EmailVerificationArgs = {
  email: string;
  code: string;
};

export const emailVerificationEvent = inngest.createFunction(
  {
    id: 'auth/email.verification',
  },
  { event: 'app/email.verification' },
  async ({ event, step }) => {
    const { email, code } = event.data;
    await step.run('Send email verification', async () => {
      return await sendEmailVerification(email, code);
    });
  }
);
