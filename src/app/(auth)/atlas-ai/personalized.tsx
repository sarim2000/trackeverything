'use client';
import { Badge, Button, Card, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { getAiSuggestedBooks } from '@src/convex/queires/aiSuggestedBook';
import { useMutation, useQuery } from 'convex/react';
import { b, AISuggestions } from '@/baml_client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import LoadingUI from '@/components/ui/loading-ui';
import { getAISuggestionsUserProfile } from '@/actions/book';
import { readStreamableValue } from 'ai/rsc';
import { SuggestionCard } from './_components/Card';
import BookSuggestionDisplay from './_components/BookSuggestionsDisplay';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';



export default function PersonalizedRecommendations() {
  const queryClient = useQueryClient();

  const mutateAiSuggestedBooks = useMutation(api.mutations.aiSuggestedBook.addAiSuggestedBooks);
  const data = useQuery(api.queires.profile.getUserProfile);

  const [aiSuggestionsState, setAiSuggestionsState] = useState<AISuggestions[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestBooks = async () => {
    setIsLoading(true);
    let aiSuggestions: AISuggestions[] = [];
    try {
      if (!data) {
        notifications.show({
          title: 'Error',
          message: 'Fill out your profile first to get personalized recommendations',
          color: 'red',
          autoClose: 1800,
        });
        return;
      }
      const { object } = await getAISuggestionsUserProfile({
        age_range: data?.ageRange || '',
        bio: data?.bio || '',
        favorite_genre: data?.favoriteGenres || [],
        preferred_media: data?.preferredMediaTypes || [],
        language: data?.languagePreferences.join(', ') || '',
      });
      for await (const partialObject of readStreamableValue(object)) {
        setAiSuggestionsState(partialObject);
        if (partialObject) {
          aiSuggestions = partialObject;
          // await mutateAiSuggestedBooks({ books: partialObject });
        }
      }
    } catch (e: any) {
      notifications.show({
        title: 'Error',
        message: 'Reached the limit of 10 recommendations. Please wait for the next day.',
        color: 'red',
        autoClose: 1800,
      });
    } finally {
      setIsLoading(false);

      if (aiSuggestions.length > 0) {
        // notifications.show({
        //   title: 'Success',
        //   message: 'Book suggestions extracted successfully',
        //   color: 'green',
        //   autoClose: 1800,
        // });
        await mutateAiSuggestedBooks({ books: aiSuggestions, typeOfSuggestion: 'personalized' });
        queryClient.invalidateQueries({ queryKey: ['atlasLimit'] });
      }
    }
  };

  return (
    <>
      <Text size="lg" mt="md">
        Personalized Picks
      </Text>
      <Text size="sm" c="dimmed">
        Discover personalized recommendations tailored to your preferences across various media types.
      </Text>
      <Button
        onClick={handleSuggestBooks}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        radius="md"
        size="md"
        mt="md"
        disabled={isLoading || data === undefined}
      >
        {isLoading ? 'Thinking...' : 'Suggest Books'}
      </Button>
      <BookSuggestionDisplay bookSuggestions={aiSuggestionsState} typeOfSuggestion="personalized" />
    </>
  );
}
