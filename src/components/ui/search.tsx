'use client';
import { Box, Button, Flex, TextInput, Select, NumberInput, Collapse } from '@mantine/core';
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
        { name: 'person', value: person },
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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
        />
        <Button onClick={() => setIsAdvancedOpen((prev) => !prev)} variant="outline">
          <IconFilter />
          Advanced Filters
        </Button>
      </Flex>
      
      <Collapse in={isAdvancedOpen}>
        <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
          <TextInput
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.currentTarget.value)}
          />
          <TextInput
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.currentTarget.value)}
          />
          <TextInput
            placeholder="Person"
            value={person}
            onChange={(e) => setPerson(e.currentTarget.value)}
          />
          <TextInput
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.currentTarget.value)}
          />
        </Flex>
      </Collapse>
      
      <Box>
        <Button onClick={handleSearch} loading={isPending}>
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Flex>
  );
}
