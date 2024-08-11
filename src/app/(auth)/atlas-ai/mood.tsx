'use client'
import { getAISuggestionsMood } from "@/actions/book";
import { AISuggestions } from "@/baml_client";
import { Text, Flex, Select, Button, Card, Stack, Badge, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { readStreamableValue } from "ai/rsc";
import Link from "next/link";
import { useState } from "react";
import { SuggestionCard } from "./_components/Card";
import { api } from "@src/convex/_generated/api";
import { useMutation } from "convex/react";
import BookSuggestionDisplay from "./_components/BookSuggestionsDisplay";
import { notifications } from "@mantine/notifications";

export default function MoodBasedRecommendations() {
  const mutateAiSuggestedBooks = useMutation(api.mutations.aiSuggestedBook.addAiSuggestedBooks);
  const [isLoading, setIsLoading] = useState(false);

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions[] | undefined>(undefined);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mood: 'sad',
      mediaType: 'book',
    },
  });

  const handleMoodBasedSuggestions = async (values: typeof form.values) => {
    setIsLoading(true);
    let aiSuggestionsTemp: AISuggestions[] = [];
    try {
      const { object } = await getAISuggestionsMood({
        mood: values.mood,
        media_type: values.mediaType,
      });

      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          aiSuggestionsTemp = partialObject
        }
        setAiSuggestions(partialObject);
      }
    } catch (e: any) {
      console.error('Error extracting mood based book suggestions', e);
      notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        autoClose: 1800,
      });
    }
    finally {
      if (aiSuggestionsTemp.length > 0) {
        // notifications.show({
        //   title: 'Success',
        //   message: 'Book suggestions extracted successfully',
        //   color: 'green',
        //   autoClose: 1800,
        // });
        await mutateAiSuggestedBooks({
          books: aiSuggestionsTemp,
          typeOfSuggestion: 'mood',
        });
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <Text size="lg" mt="md">
        Mood-based
      </Text>
      <Text size="sm" c="dimmed">
        Discover personalized recommendations tailored to your mood across various media types.
      </Text>

      <form onSubmit={form.onSubmit(handleMoodBasedSuggestions)}>
        <Flex gap="md" direction="row" mt="md">
          <Select
            label="Tell me about your mood"
            placeholder="Pick value"
            data={['happy', 'sad', 'neutral']}
            radius="md"
            size="md"
            style={{ width: '50%' }}
            defaultValue={form.values.mood}
            key={form.key('mood')}
            {...form.getInputProps('mood')}
          />
          <Select
            label="Pick a media type"
            placeholder="Pick value"
            data={['book']}
            radius="md"
            size="md"
            style={{ width: '50%' }}
            key={form.key('mediaType')}
            defaultValue={form.values.mediaType}
            disabled={true}
            {...form.getInputProps('mediaType')}
          />
        </Flex>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="md"
          size="md"
          mt="md"
          type="submit"
          loading={isLoading}
        >
          Suggest Books
        </Button>
      </form>
      <BookSuggestionDisplay bookSuggestions={aiSuggestions} typeOfSuggestion="mood" />
    </>
  );
}
