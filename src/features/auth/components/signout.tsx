'use client';
import { useStateAction } from 'next-safe-action/stateful-hooks';
import { SubmitButton } from '@/components/submit-button';
import { signOutAction } from '../actions/sign-out';

export const SignOut = () => {
  const { execute } = useStateAction(signOutAction, {});

  return (
    <form action={execute}>
      <SubmitButton label="Sign Out" />
    </form>
  );
};
