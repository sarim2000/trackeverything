'use client';

import type { MyBook } from '@/lib/types';
import { Badge, Box, Button, Card, Flex, Group, Image, Rating, Text } from '@mantine/core';
import Link from 'next/link';

export default function HomeBookCardComponent({ book }: { book: MyBook  }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }} key={book.id}>
      <Card.Section>
        {book.cover_img ? (
          <Image fit="contain" src={book.cover_img} height={320} alt={book.title} />
        ) : (
          <Flex justify="center" align="center" style={{ height: '320px' }}>
            <Text>No cover image</Text>
          </Flex>
        )}
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} lineClamp={1}>
          {book.title}
        </Text>
        <Rating value={book.rating?.rating} color="yellow" fractions={2} readOnly />
      </Group>
      <Text c="blue" mb="xs">
        by {book.author_name}
      </Text>

      <Text size="sm" c="dimmed" lineClamp={4} style={{ minHeight: '80px' }}>
        {book.description}
      </Text>
      <Link href={`/home/my/books/${book.id}`} style={{ textDecoration: 'none' }}>
        <Button fullWidth mt="md" radius="md">
          Edit / View
        </Button>
      </Link>
    </Card>
  );
  // oekMzE5tWmptnXe0TmfychNAG_HEqoYpHb_X3dn3
}
