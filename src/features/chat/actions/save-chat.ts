'use server';
import { generateId, Message } from 'ai';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/getAuth';
import { db } from '@/lib/drizzle';
import { chatTable, conversationTable } from '../../../../drizzle/schema';

export const saveChat = async (chatId: string, messages: Message[]) => {
  const { user } = await getAuth();

  if (!user) {
    redirect('/login');
  }

  //TODO: Use a transaction to ensure atomicity

  let [conversation] = await db
    .select()
    .from(conversationTable)
    .where(eq(conversationTable.id, chatId));

  if (!conversation) {
    await db.insert(conversationTable).values({
      id: chatId,
      title: 'New Conversation',
      userId: user.id,
    });

    [conversation] = await db
      .select()
      .from(conversationTable)
      .where(eq(conversationTable.id, chatId));
  }

  for (const message of messages) {
    await db.insert(chatTable).values({
      id: generateId(),
      content: message.content,
      conversationId: conversation.id,
      role: message.role === 'assistant' ? 'ai' : 'user',
      userId: user.id,
    });

    if (
      message.role === 'assistant' &&
      conversation.title === 'New Conversation'
    ) {
      const title = message.content.split('\n')[0];
      await db
        .update(conversationTable)
        .set({ title: title || 'New Conversation' })
        .where(eq(conversationTable.id, conversation.id));
    }
  }
};
