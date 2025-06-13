import { redirect } from 'next/navigation';
import { createChat } from '@/features/chat/actions/create-chat';

export default async function Chat() {
  const id = await createChat();

  redirect(`/chat/${id}`);
}
