'use client';

import { Message, useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ChatTranscriptProps = {
  userAvatar: React.ReactElement;
  aiAvatar: React.ReactElement;
  id?: string | undefined;
  initialMessages?: Message[];
};

export default function ChatTranscript({
  userAvatar,
  aiAvatar,
  id,
  initialMessages,
}: ChatTranscriptProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id,
    initialMessages,
    sendExtraMessageFields: true,
  });

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="mx-auto w-full max-w-2xl px-4 pt-12">
        {messages.map(message => (
          <div key={message.id} className="mb-6 flex flex-col gap-2">
            <div className="text-muted-foreground text-sm">
              {message.role === 'user' ? userAvatar : aiAvatar}
            </div>
            {message.parts.map((part, i) => {
              if (part.type === 'text') {
                return (
                  <div
                    key={`${message.id}-${i}`}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm break-words whitespace-pre-wrap',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto self-end'
                        : 'bg-secondary dark:bg-muted dark:text-muted-foreground mr-auto self-start text-black'
                    )}>
                    {part.text}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>

      <div ref={endRef} className="flex items-center justify-center pt-24" />

      <form
        onSubmit={handleSubmit}
        className="bg-background sticky bottom-0 flex w-full max-w-2xl items-center justify-center pb-[100px]">
        <Textarea
          className="border-input bg-background fixed bottom-4 w-full max-w-2xl rounded-lg border p-8 text-sm shadow-sm"
          placeholder="Ask me anything..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </form>
    </div>
  );
}
