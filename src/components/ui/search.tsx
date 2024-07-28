'use client';
import { Box, Button, Flex, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function Search() {
  const [value, setValue] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('title', value);
      } else {
        params.delete('title');
      }
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        placeholder="..."
        size="lg"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Box>
        <Button onClick={handleSearch} loading={isPending} loaderProps={{type: "dots"}}>
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Flex>
  );
}