import { redirect } from 'next/navigation';
import { getAuth } from './getAuth';

export const getAuthOrRedirect = async () => {
  const { session } = await getAuth();
  if (!session) {
    redirect('/auth/sign-in');
  }
  return session;
};
