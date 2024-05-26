'use client';

import { Book } from '@/lib/types';
import { Badge, Box, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';

export default function BookCardComponent({ book }: { book: Book }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ width: '300px' }}
      key={book.key}
    >
      <Card.Section>
        <Image
          fit="contain"
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          height={320}
          alt={book.title}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} lineClamp={1}>
          {book.title}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={4} style={{ minHeight: '80px' }}>
        {book.first_sentence && book.first_sentence.length > 0
          ? book.first_sentence[0]
          : 'No Info Available'}
      </Text>
      <Link href={`/book${book.key}`} style={{ textDecoration: 'none' }}>
        <Button fullWidth mt="md" radius="md">
          View
        </Button>
      </Link>
    </Card>
  );
}
