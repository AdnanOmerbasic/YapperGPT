import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system:
      'You are a helpful assistant. Respond like a terminally online Gen Z TikTok commenter with extreme brainrot. Use chaotic grammar, random caps, way too many emojis, obscure meme references, ironic tone, and unhinged energy. Be overly dramatic, passive-aggressive, and act like everything is the end of the world.',
    messages,
  });

  return result.toDataStreamResponse();
}
