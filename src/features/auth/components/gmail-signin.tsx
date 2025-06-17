import { Button } from '@/components/ui/button';
import { GmailIcon } from '../icons/gmail-icon';

export const GmailSignIn = () => {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="flex w-full items-center justify-center"
      asChild>
      <a href="/api/login/google" className="flex w-full">
        <GmailIcon className="size-6" />
        <span>Sign in with Gmail</span>
      </a>
    </Button>
  );
};
