'use server';
import { createStreamableValue } from 'ai/rsc';
import { BookSuggestions, UserProfile, b } from "@/baml_client";


export async function suggestBooks(user_profile: UserProfile) {
  // Note, we will expose these partial types soon
  const bookSuggestionsStream = createStreamableValue<BookSuggestions[], any>();

  (async () => {
    const stream = b.stream.SuggestBooks(user_profile)

    for await (const event of stream) {
      if (event) {
        bookSuggestionsStream.update(event as BookSuggestions[]);
      }
    }


    bookSuggestionsStream.done();
  })();


  return { object: bookSuggestionsStream.value };
}
