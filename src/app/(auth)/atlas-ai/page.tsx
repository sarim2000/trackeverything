'use client';

import { suggestBooks } from '@/actions/book';
import { AISuggestions } from '@/baml_client';
import LoadingUI from '@/components/ui/loading-ui';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { readStreamableValue } from 'ai/rsc';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Personalized from './personalized';

export default function Page() {
  const data = useQuery(api.queires.profile.getUserProfile);
  const mutateAiSuggestedBooks = useMutation(api.mutations.aiSuggestedBook.addAiSuggestedBooks);

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestBooks = async () => {
    setIsLoading(true);
    let aiSuggestions: AISuggestions[] = [];
    try {
      const { object } = await suggestBooks({
        age_range: data?.ageRange || '',
        bio: data?.bio || '',
        favorite_genre: data?.favoriteGenres || [],
        preferred_media: data?.preferredMediaTypes || [],
        language: data?.languagePreferences.join(', ') || '',
      });
      for await (const partialObject of readStreamableValue(object)) {
        setAiSuggestions(partialObject);
        if (partialObject) {
          aiSuggestions = partialObject;
          // await mutateAiSuggestedBooks({ books: partialObject });
        }
      }
    } catch (e) {
      console.error('Error extracting book suggestions', e);
    } finally {
      setIsLoading(false);
      if (aiSuggestions.length > 0) {
        await mutateAiSuggestedBooks({ books: aiSuggestions });
      }
    }
  };



  return (
    <Flex direction="column" gap="md">
      <Box mb="md">
        <Title order={2}>A.T.L.A.S AI Recommendations</Title>
        <Text size="sm" color="dimmed">
          Adaptive Taste Learning and Suggestion System
        </Text>
        <Text mt="xs">
          Discover personalized recommendations tailored to your unique preferences across various media types.
        </Text>
      </Box>
      <Tabs defaultValue="personalized">
        <Tabs.List>
          <Tabs.Tab value="personalized">Personalized Picks</Tabs.Tab>
          <Tabs.Tab value="moodBased">Mood-based</Tabs.Tab>
          <Tabs.Tab value="challenge">Media Challenge</Tabs.Tab>
          <Tabs.Tab value="discovery">Discovery</Tabs.Tab>
          <Tabs.Tab value="similar">Similar Media</Tabs.Tab>
          <Tabs.Tab value="crossMedia">Cross-Media</Tabs.Tab>
          <Tabs.Tab value="hiddenGems">Hidden Gems</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personalized">
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
            radius="xl"
            size="md"
            mt="md"
            disabled={isLoading || data === undefined}
          >
            {isLoading ? 'Thinking...' : 'Suggest Books'}
          </Button>
          <Personalized bookSuggestions={aiSuggestions} />
        </Tabs.Panel>

        <Tabs.Panel value="moodBased">
          <Text size="lg" mt="md">
            Mood-based
          </Text>
          <Text size="sm" c="dimmed">
            Discover personalized recommendations tailored to your mood across various media types.
          </Text>

          <Box>
            <Select label="Tell me about your mood" placeholder="Pick value" data={['happy', 'sad', 'neutral']} />
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="xl" size="md" mt="md">
              Generate Book Recommendations
            </Button>
          </Box>
        </Tabs.Panel>

        {/* Add other Tabs.Panel components for each tab */}
      </Tabs>
    </Flex>
  );
}
