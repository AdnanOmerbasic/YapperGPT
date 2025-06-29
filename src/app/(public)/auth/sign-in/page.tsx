import { redirect } from 'next/navigation';
import { SignInForm } from '@/features/auth/components/signin-form';
import { getAuth } from '@/features/auth/queries/getAuth';

export default async function SignInPage() {
  const { session } = await getAuth();

  if (session) {
    redirect('/chat');
  }

  return <SignInForm />;
}
