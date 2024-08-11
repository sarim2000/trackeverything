'use client';
import { Badge, Button, Card, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { getAiSuggestedBooks } from '@src/convex/queires/aiSuggestedBook';
import { useMutation, useQuery } from 'convex/react';
import { b, BookSuggestions } from '@/baml_client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import LoadingUI from '@/components/ui/loading-ui';

const BookSuggestionCard = ({ bookSuggestion }: { bookSuggestion: BookSuggestions[] }) => {
  return (
    <>
      <Flex direction="column" gap="md" mt="lg">
        <Text size="lg" fw={500}>
          {bookSuggestion.length} books found
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing="lg"
        >
          {bookSuggestion.map((book) => (
            <Card key={book.title} shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
              <Stack mt="md" gap="xs" style={{ flexGrow: 1 }}>
                <Text fw={700} lineClamp={2}>
                  {book.title}
                </Text>
                <Badge color="pink" variant="light" size="sm">
                  {book.author}
                </Badge>
                <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
                  {book.description}
                </Text>
                <Text size="md" color="blue" mt="xs">
                  Reason: {book.reason}
                </Text>
              </Stack>
              <Button
                component={Link}
                href={`/books?title=${encodeURIComponent(book?.title || '')}`}
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Search
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default function Personalized({ bookSuggestions }: { bookSuggestions: BookSuggestions[] | undefined }) {
  const getAiSuggestedBooks = useQuery(api.queires.aiSuggestedBook.getAiSuggestedBooks);

  if (getAiSuggestedBooks === undefined) {
    return <LoadingUI />;
  }

  if (bookSuggestions && bookSuggestions.length > 0) {
    return <BookSuggestionCard bookSuggestion={bookSuggestions} />;
  }

  return (
    <>
      {getAiSuggestedBooks?.books && <BookSuggestionCard bookSuggestion={getAiSuggestedBooks?.books} />}
    </>
  );
}
