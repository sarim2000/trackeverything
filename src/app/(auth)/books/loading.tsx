import { Box, Flex, Skeleton } from '@mantine/core';

export default function Loading() {
  return (
    <Flex wrap={'wrap'} justify={'center'} gap={'lg'}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Box style={{ width: '300px' }} key={index}>
          <Skeleton key={index} height={320} width={300} radius="md" style={{ flex: '0 0 300px' }} />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      ))}
    </Flex>
  );
}
