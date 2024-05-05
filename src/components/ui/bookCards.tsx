'use client';

import { Book } from '@/lib/types';
import { Badge, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';

export default function BookCardComponent({ books }: { books: Book[] }) {
  return (
    <Flex wrap={'wrap'} justify={'center'} gap={'lg'}>
      {books &&
        books.length > 0 &&
        books?.map((book) => (
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

            <Text size="sm" c="dimmed" lineClamp={4}>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>

            <Link href={`/book${book.key}`}>
              <Button color="blue" fullWidth mt="md" radius="md">
                View
              </Button>
            </Link>
          </Card>
        ))}
    </Flex>
  );
}
