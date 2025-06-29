import { EventSchemas, Inngest } from 'inngest';
import { EmailVerificationArgs } from '@/features/auth/events/email-verification-event';

type Events = {
  'app/email.verification': {
    name: 'app/email.verification';
    data: EmailVerificationArgs;
  };
};
export const inngest = new Inngest({
  id: 'yapperGPT',
  schemas: new EventSchemas().fromRecord<Events>(),
});
