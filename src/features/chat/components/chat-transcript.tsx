'use client';
import { useChat } from '@ai-sdk/react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

//TODO: FIX Design
type ChatTranscriptProps = {
  userAvatar: React.ReactElement;
  aiAvatar: React.ReactElement;
};

export default function ChatTranscript({
  userAvatar,
  aiAvatar,
}: ChatTranscriptProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? userAvatar : aiAvatar}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return (
                  <div
                    className={cn(
                      message.role === 'user' &&
                        'flex items-center justify-end pt-1 pr-1.5 pb-4',
                      message.role === 'assistant' && 'pt-1 pb-4 pl-1.5'
                    )}
                    key={`${message.id}-${i}`}>
                    {part.text}
                  </div>
                );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center">
        <Textarea
          className="fixed bottom-0 mb-8 w-full max-w-2xl rounded-lg border border-zinc-300 p-7 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          value={input}
          placeholder="Ask me anything..."
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
