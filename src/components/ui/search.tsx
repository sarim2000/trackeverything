'use client';
import { Box, Button, Flex, TextInput, Select, NumberInput, Collapse, Text } from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function Search() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [place, setPlace] = useState('');
  const [person, setPerson] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishYearBefore, setPublishYearBefore] = useState<number | ''>('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      const fields = [
        { name: 'title', value: title },
        { name: 'author', value: author },
        { name: 'subject', value: subject },
        { name: 'place', value: place },
        { name: 'publisher', value: publisher },
      ];

      fields.forEach(({ name, value }) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });

      if (publishYearBefore) {
        params.set('publish_year', `[* TO ${publishYearBefore}]`);
      } else {
        params.delete('publish_year');
      }

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Flex direction="column" gap="md" align="center">
      <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <TextInput
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
        />
      </Flex>
      
      <Text size="sm" c="dimmed">
        Search by title, author, or both
      </Text>
      
      <Box>
        <Button onClick={handleSearch} loading={isPending}>
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Flex>
  );
}
