'use server';
import { generateId } from 'ai';
import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/getAuth';
import { db } from '@/lib/drizzle';
import { conversationTable } from '../../../../drizzle/schema';

export const createChat = async () => {
  const id = generateId();
  const { user } = await getAuth();
  if (!user) {
    redirect('/login');
  }

  await db.insert(conversationTable).values({
    id,
    title: 'New Conversation',
    userId: user.id,
  });

  return id;
};
