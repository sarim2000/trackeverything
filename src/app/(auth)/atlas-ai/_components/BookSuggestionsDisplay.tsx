import { AISuggestions } from "@/baml_client";
import LoadingUI from "@/components/ui/loading-ui";
import { api } from "@src/convex/_generated/api";
import { useQuery } from "convex/react";
import BookSuggestionList from "./BookSuggestionList";

export default function BookSuggestionDisplay({ bookSuggestions, typeOfSuggestion }: { bookSuggestions: AISuggestions[] | undefined, typeOfSuggestion: 'personalized' | 'mood' }) {
  const savedSuggestions = useQuery(api.queires.aiSuggestedBook.getAiSuggestedBooks, {
    typeOfSuggestion: typeOfSuggestion,
  });
  const data = useQuery(api.queires.profile.getUserProfile);

  if (data === undefined) {
    return <LoadingUI />;
  }

  const displaySuggestions = bookSuggestions || savedSuggestions?.books;

  return displaySuggestions ? <BookSuggestionList suggestions={displaySuggestions} /> : null;
}
