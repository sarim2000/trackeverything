import Search from '@/components/ui/search';
import { Box, Flex } from '@mantine/core';
import { Suspense } from 'react';
import Loading from './loading';
import BookLayout from './main';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    author?: string;
    year?: string;
    genre?: string;
    page?: string;
  };
}) {
  const query = {
    title: searchParams?.title || '',
    author: searchParams?.author || '',
    year: searchParams?.year || '',
    genre: searchParams?.genre || '',
  };

  return (
    <Flex direction={'column'} align={'center'} gap={'lg'}>
      <Box>
        <h1>Find Your Book!</h1>
      </Box>
      <Flex direction={'column'} align={'center'} gap={'lg'}>
        <Flex direction={'column'} gap={'md'} align={'center'}>
          <Flex gap="md" justify="center" align="center" direction="column" wrap="wrap">
            <Search />
            <BookLayout query={query} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
