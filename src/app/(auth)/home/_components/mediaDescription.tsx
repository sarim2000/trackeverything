'use client';

import { Box, Flex, Text, Image, Loader, Rating } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { useQuery } from 'convex/react';

interface MediaDescriptionProps {
  type: 'books';
  id: string;
}

const typeToQueryMap = {
  books: api.queires.books.getBook,
};

export default function MediaDescription({ type, id }: MediaDescriptionProps) {
  console.log('🚀 ~ MediaDescription ~ type:', type);

  const query = typeToQueryMap[type];
  console.log(query);
  const data = useQuery(query, { id });

  console.log(data);

  if (!data) {
    return (
      <Flex justify="center">
        <Loader type="dots" />
      </Flex>
    );
  }

  return (
    <Box>
      <Flex
        gap="xl"
        align="flex-start"
        justify="space-between"
        direction={{ base: 'column', sm: 'row' }}
        wrap="nowrap"
      >
        <Box style={{ width: '100%', maxWidth: '320px', flexShrink: 0, display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
          {data.cover_img ? (
            <Image
              fit="contain"
              src={data.cover_img}
              height={320}
              alt={data.title}
              radius="md"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '100%' }}
            />
          ) : (
            <Flex
              justify="center"
              align="center"
              style={{ height: '320px', border: '1px solid #eaeaea', borderRadius: '8px' }}
              wrap="nowrap"
              p="md"
            >
              <Text>No cover image available</Text>
            </Flex>
          )}
        </Box>
        <Flex direction="column" justify="flex-start" gap="md" style={{ flex: 1, minWidth: 0 }}>
          <Text size="xl" lineClamp={2}>
            {data.title}
          </Text>
          <Rating defaultValue={2} color="yellow" size="lg" />
          <Text size="sm" color="dimmed">
            {/* Add author or other relevant info here */}
          </Text>
          <Box mt="md">
            <Text lineClamp={5}>{data.description}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}