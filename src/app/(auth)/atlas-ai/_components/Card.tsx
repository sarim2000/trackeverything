import { AISuggestions } from '@/baml_client';
import { Text, Flex, Select, Button, Card, Stack, Badge } from '@mantine/core';
import Link from 'next/link';

export function SuggestionCard({ suggestedBook }: { suggestedBook: AISuggestions }) {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
      <Stack mt="md" gap="xs" style={{ flexGrow: 1 }}>
        <Text fw={700} lineClamp={2}>
          {suggestedBook.title}
        </Text>
        <Badge color="pink" variant="light" size="sm">
          {suggestedBook.author}
        </Badge>
        <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
          {suggestedBook.description}
        </Text>
        <Text size="md" color="blue" mt="xs">
          Reason: {suggestedBook.reason}
        </Text>
      </Stack>
      <Button
        component={Link}
        href={`/books?title=${encodeURIComponent(suggestedBook?.title || '')}`}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Search
      </Button>
    </Card>
  );
}
