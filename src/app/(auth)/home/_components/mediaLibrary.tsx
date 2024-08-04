'use client';
import { convexQuery } from '@convex-dev/react-query';
import { Box, Button, Collapse, Divider, Flex, Grid, Loader, Text } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { id } from 'convex-helpers/validators';
import { useQuery } from 'convex/react';
import HomeBookCardComponent from './homeBookCardComponent';
import { useDisclosure } from '@mantine/hooks';
import DropdownArrow from '@/components/icons/dropdown-arrow';

interface MediaLibraryProps {
  type: 'books';
}

const typeToQueryMap = {
  books: api.queires.books.getBooks,
};

export default function MediaLibrary({ type }: MediaLibraryProps) {
  const queryFunction = typeToQueryMap[type];
  const data = useQuery(queryFunction)
  const [opened, { toggle }] = useDisclosure(true);

  if (!data) {
    return <Flex justify="center">
      <Loader type="dots" />
    </Flex>;
  }
  

  return (
    <Box>
      <Flex justify="space-between">
        <Text size="xl">
          {type}
        </Text>
        <Button onClick={toggle} variant='transparent'>
          <DropdownArrow direction={opened ? 'up' : 'down'}/>
        </Button>
      </Flex>
      <Divider my="md" />
      <Collapse in={opened}>
        <Grid gutter="md">
          {data.map((book) => (
            <Grid.Col key={book.id} span={{ base: 12, sm: 6, md: 4 }}>
              <HomeBookCardComponent book={book} />
            </Grid.Col>
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
}
