import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.REDIS_UPSTASH_URL,
  token: process.env.REDIS_UPSTASH_TOKEN,
});
