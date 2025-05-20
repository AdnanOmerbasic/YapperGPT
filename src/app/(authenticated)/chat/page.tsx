import { getAuth } from '@/features/auth/utils/getAuth';
import ChatTranscript from '@/features/chat/components/chat-transcript';
import { extractEmailTag } from '@/features/chat/utils/extractEmailTag';

export default async function Chat() {
  const { user } = await getAuth();

  return <ChatTranscript email={extractEmailTag(user?.email ?? 'User')} />;
}
