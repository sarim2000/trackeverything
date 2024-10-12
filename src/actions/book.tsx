'use server';
import { createStreamableValue } from 'ai/rsc';
import { AISuggestions, UserProfile, b } from "@/baml_client";
import { auth } from '@/auth';
import { Redis } from '@upstash/redis';


const redis = Redis.fromEnv();



export async function getAISuggestionsUserProfile(user_profile: UserProfile) {

  const session = await auth();
  console.log("session", session?.user?.id);
  // console.log("client", redis.con);

  /// rate limit based on user id
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const rateKey = `rate_limit:${userId}`;
  const currentCount: string | null = await redis.get(rateKey);

  if (currentCount === null) {
    // First request of the day
    await redis.set(rateKey, '1', { ex: 86400 }); // 24 hours in seconds
  } else if (parseInt(currentCount) >= 10) {
    throw new Error("Rate limit exceeded. Try again tomorrow.");
  } else {
    await redis.incr(rateKey);
  }


  // console.log("Rate limit count:", await redis.get(rateKey));

  const bookSuggestionsStream = createStreamableValue<AISuggestions[], any>();

  (async () => {
    const stream = b.stream.SuggestBooks(user_profile)

    for await (const event of stream) {
      if (event) {
        bookSuggestionsStream.update(event as AISuggestions[]);
      }
    }


    bookSuggestionsStream.done();

  })();


  return { object: bookSuggestionsStream.value };
}

export async function getAISuggestionsMood({mood, media_type}: {mood: string, media_type: string}) {

  const session = await auth();
  console.log('session', session?.user?.id);
  // console.log("client", redis.con);

  /// rate limit based on user id
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const rateKey = `rate_limit:${userId}`;
  const currentCount: string | null = await redis.get(rateKey);

  if (currentCount === null) {
    // First request of the day
    await redis.set(rateKey, '1', { ex: 86400 }); // 24 hours in seconds
  } else if (parseInt(currentCount) >= 10) {
    throw new Error('Rate limit exceeded. Try again tomorrow.');
  } else {
    await redis.incr(rateKey);
  }


  const aiSuggestionsStream = createStreamableValue<AISuggestions[], any>();

  (async () => {
    const stream = b.stream.GetMoodBasedSuggestions({mood, media_type})

    for await (const event of stream) {
      if (event) {
        aiSuggestionsStream.update(event as AISuggestions[]);
      }
    }

    aiSuggestionsStream.done();
  })();


  return { object: aiSuggestionsStream.value }
}
