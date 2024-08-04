'use client';

import { Box, Flex, Text, Image, Loader, Rating } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';

interface MediaDescriptionProps {
  type: 'books';
  id: string;
}

const typeToQueryMap = {
  books: api.queires.books.getBook,
};

export default function MediaDescription({ type, id }: MediaDescriptionProps) {
  const ratingMutation = useMutation(api.mutations.ratings.insertRating);
  const rating = useQuery(api.queires.ratings.getRatings, { id });
  console.log("🚀 ~ MediaDescription ~ rating:", rating)


  const query = typeToQueryMap[type];
  const data = useQuery(query, { id });


  if (!data) {
    return (
      <Flex justify="center">
        <Loader type="dots" />
      </Flex>
    );
  }

  const insertRating = async (rating: number) => {
    await ratingMutation({ rating, mediaId: id });
  };

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
          <Rating 
            color="yellow" 
            size="lg" 
            fractions={2} 
            onChange={insertRating}
            value={rating}
          />
          <Text size="sm" c="dimmed">
            by {data.author_name}
          </Text>
          <Box mt="md">
            <Text lineClamp={5}>{data.description}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}