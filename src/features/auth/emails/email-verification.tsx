import WelcomeMailTemplate from '@/components/emails/auth/welcome-mail-template';
import { resend } from '@/lib/resend';

export const sendEmailVerification = async (toEmail: string, code: string) => {
  return await resend.emails.send({
    from: 'noreply@app.yappergpt.org',
    to: toEmail,
    subject: 'Verify your email',
    react: WelcomeMailTemplate({ toEmail, code }),
  });
};
