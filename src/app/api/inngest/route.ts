import { serve } from 'inngest/next';
import { emailVerificationEvent } from '@/features/auth/events/email-verification-event';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [emailVerificationEvent],
});
