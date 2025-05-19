'use server';
import { redirect } from 'next/navigation';
import { getAuth } from '../utils/getAuth';
import { invalidateSession } from '../utils/session';
import { deleteSessionCookie } from '../utils/session-cookies';

export const signOutAction = async () => {
  const { session } = await getAuth();
  if (!session) {
    redirect('/auth/sign-in');
  }
  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect('/auth/sign-in');
};
