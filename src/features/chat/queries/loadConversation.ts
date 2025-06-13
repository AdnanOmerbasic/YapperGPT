import { eq, asc } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { chatTable, conversationTable } from '../../../../drizzle/schema';

export const loadConversation = async (id: string) => {
  return await db
    .select({
      chatId: chatTable.id,
      conversationId: conversationTable.id,
      title: conversationTable.title,
      content: chatTable.content,
      role: chatTable.role,
    })
    .from(conversationTable)
    .leftJoin(chatTable, eq(chatTable.conversationId, conversationTable.id))
    .where(eq(conversationTable.id, id))
    .orderBy(asc(chatTable.createdAt));
};
