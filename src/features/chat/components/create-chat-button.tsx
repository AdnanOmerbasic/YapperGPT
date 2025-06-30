'use client';

import { LucideMessageCirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createChat } from '../actions/create-chat';

export const CreateChatButton = () => {
  const router = useRouter();
  const handleCreateChat = async () => {
    const id = await createChat();
    router.push(`/chat/${id}`);
  };

  return (
    <Button onClick={handleCreateChat} variant="outline" className="w-full">
      <LucideMessageCirclePlus className="mr-2" />
    </Button>
  );
};
