'use client';
import { getAISuggestionsMood } from '@/actions/book';
import { AISuggestions } from '@/baml_client';
import { Text, Flex, Select, Button, Card, Stack, Badge, SimpleGrid, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { readStreamableValue } from 'ai/rsc';
import Link from 'next/link';
import { useState } from 'react';
import { SuggestionCard } from './_components/Card';
import { relative } from 'path';
import { IconHammer } from '@tabler/icons-react';

export default function ExploreRecommendations() {
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions[] | undefined>(undefined);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mood: 'sad',
      mediaType: 'book',
    },
  });

  const handleMoodBasedSuggestions = async (values: typeof form.values) => {
    try {
      const { object } = await getAISuggestionsMood({
        mood: values.mood,
        media_type: values.mediaType,
      });

      for await (const partialObject of readStreamableValue(object)) {
        setAiSuggestions(partialObject);
      }
    } catch (e) {
      console.error('Error extracting mood based book suggestions', e);
    }
  };
  return (
    <Box pos="relative" p="md">
      <Text size="lg" mb="md">
        Explore
      </Text>
      <Box
        style={{
          border: '1px dashed #FFD700',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Flex direction="column" align="center" gap="md">
          <Text size="xl" fw={700} style={{ color: '#FFD700' }}>
            🚧 Under Construction 🚧
          </Text>
          <Text size="sm" c="dimmed">
            We're building something amazing! Soon you'll be able to discover and explore books, movies, and games based
            on your overall library.
          </Text>
          <Box
            style={{
              width: '50px',
              height: '50px',
            }}
          >
            <IconHammer />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
