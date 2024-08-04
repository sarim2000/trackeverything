'use client';

import { api } from '@src/convex/_generated/api';
import { useQuery } from 'convex/react';
import LoadingUI from './loading-ui';
import { Card, Text, Flex, Avatar, Group, Box, Paper } from '@mantine/core';
import timeAgo from '@/lib/utils';

export default function Comments({ id }: { id: string }) {
  const data = useQuery(api.queires.comments.getComments, { id });

  if (!data) {
    return <LoadingUI />;
  }

  

  return (
    <Flex direction="column">
      {data.map((comment) => (
        <Box p="md" mb="md" key={comment._id}>
          <Paper withBorder p="md">
            <Group>
              {comment.user?.image ? (
                <Avatar src={comment.user.image} alt={comment.user.name} radius="xl" />
              ) : (
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                  alt={comment.user?.name}
                  radius="xl"
                />
              )}
              <div>
                <Text size="sm">{comment.user?.name}</Text>
                <Text size="xs" c="dimmed">
                  {timeAgo(comment._creationTime)}
                </Text>
              </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
              {comment.content}
            </Text>
          </Paper>
        </Box>
      ))}
    </Flex>
  );
}
