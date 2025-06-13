import { getAuth } from '@/features/auth/utils/getAuth';
import ChatTranscript from '@/features/chat/components/chat-transcript';
import { EmailTagAvatar } from '@/features/chat/components/email-tag-avatar';
import { loadConversation } from '@/features/chat/queries/loadConversation';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  const { user } = await getAuth();
  const conversation = await loadConversation(id);

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  const userAvatar = <EmailTagAvatar email={user?.email} role="user" />;
  const aiAvatar = <EmailTagAvatar role="ai" />;

  return (
    <ChatTranscript
      userAvatar={userAvatar}
      aiAvatar={aiAvatar}
      initialMessages={conversation
        .filter(msg => msg.content && msg.role)
        .map(msg => ({
          id: msg.chatId!,
          title: msg.title,
          content: msg.content as string,
          role: msg.role === 'ai' ? 'assistant' : 'user',
        }))}
      id={id}
    />
  );
}
