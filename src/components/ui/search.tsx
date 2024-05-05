'use client';
import { Box, Button, Flex, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const [value, setvalue] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  return (
    <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        placeholder="..."
        size="lg"
        defaultValue={searchParams.get('title') || ''}
        onChange={(e) => setvalue(e.currentTarget.value)}
      />
      <Box>
        <Button
          onClick={async () => {
            const params = new URLSearchParams(searchParams);
            if (value) {
              params.set('title', value);
            } else {
              params.delete('title');
            }
            replace(`${pathname}?${params.toString()}`);
          }}
        >
          Search{' '}
        </Button>
      </Box>
    </Flex>
  );
}
