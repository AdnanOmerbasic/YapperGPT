'use server';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { conversationTable } from '../../../../drizzle/schema';

export const getAllConversationsByTitle = async (userId: number) => {
  return await db
    .select({
      id: conversationTable.id,
      title: conversationTable.title,
      createdAt: conversationTable.createdAt,
    })
    .from(conversationTable)
    .where(eq(conversationTable.userId, userId))
    .orderBy(desc(conversationTable.createdAt));
};
