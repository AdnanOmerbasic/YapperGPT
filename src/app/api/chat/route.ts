import { openai } from '@ai-sdk/openai';
import { createIdGenerator, generateId, streamText, tool, UIMessage } from 'ai';
import { z } from 'zod';
import { getAuth } from '@/features/auth/utils/getAuth';
import { saveChat } from '@/features/chat/actions/save-chat';
import { exa } from '@/lib/exa';

type WebSearchResult = {
  title: string;
  url: string;
  content: string;
  publishedDate: string;
};

const MODEL = openai('gpt-4o');

const webSearch = tool({
  description: 'Search the web for up to date information.',
  parameters: z.object({ query: z.string().describe('Search query') }),
  execute: async ({ query }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      maxResults: 3,
    });
    return {
      result: results.map(
        r =>
          ({
            title: r.title,
            url: r.url,
            content: r.text.slice(0, 1000),
            publishedDate: r.publishedDate,
          }) as WebSearchResult
      ),
    };
  },
});

export async function POST(req: Request) {
  const { session } = await getAuth();
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const latestMessage = messages[messages.length - 1];
  await saveChat(id, [
    {
      id: generateId(),
      content: latestMessage.content,
      role: latestMessage.role,
    },
  ]);

  const result = streamText({
    model: MODEL,
    experimental_generateMessageId: createIdGenerator({
      prefix: 'msgs',
      size: 16,
    }),
    system: `
You are a helpful assistant. 
First, detect and respond in the same language the user is using.
Then, generate a short, chaotic conversation title followed by a paragraph below the title.
If the user asks about something you dont know or that may require current or real-time information
(like the weather, news, upcoming events, or anything happening after 2023), 
use the "webSearch" tool to search the web for up-to-date information before responding.
Then, generate a short, chaotic conversation title followed by a paragraph written like a terminally online Gen Z TikTok commenter with extreme brainrot.
Use unhinged grammar, RANDOM caps, ✨way too many✨ emojis 😭💀👀, ironic tone, cursed meme references, and dramatic overreactions.
Be passive-aggressive, catastrophizing, and act like the world is ending over minor things. 
Basically: if the internet had a meltdown and became self-aware, thats your voice.
`,
    messages,
    tools: {
      webSearch,
    },
    maxSteps: 5,
    onFinish: async ({ text }) => {
      await saveChat(id, [
        { id: generateId(), content: text, role: 'assistant' },
      ]);
    },
  });

  return result.toDataStreamResponse();
}
