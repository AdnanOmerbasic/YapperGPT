import { redirect } from 'next/navigation';
import { SignUpForm } from '@/features/auth/components/signup-form';
import { getAuth } from '@/features/auth/queries/getAuth';

export default async function SignUp() {
  const { session } = await getAuth();

  if (session) {
    redirect('/chat');
  }

  return <SignUpForm />;
}
