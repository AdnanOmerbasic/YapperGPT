import { getAuth } from '@/features/auth/queries/getAuth';
import ChatTranscript from '@/features/chat/components/chat-transcript';
import { EmailTagAvatar } from '@/features/chat/components/email-tag-avatar';

export default async function Chat() {
  const { user } = await getAuth();

  const userAvatar = <EmailTagAvatar email={user!.email} role="user" />;
  const aiAvatar = <EmailTagAvatar role="ai" />;
  return <ChatTranscript userAvatar={userAvatar} aiAvatar={aiAvatar} />;
}
