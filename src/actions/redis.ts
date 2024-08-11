'use server';

import { auth } from '@/auth';
import { Redis } from '@upstash/redis';


const redis = Redis.fromEnv();

export const getAtlasLimit = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return 0;
  }
  const limit = await redis.get(`rate_limit:${session?.user?.id}`);
  return limit as number;
};
