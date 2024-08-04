import { Box, Button, Divider, Flex, Group, Text, TextInput, Textarea } from '@mantine/core';
import MediaDescription from '../../_components/mediaDescription';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@src/convex/_generated/api';
import { auth } from '@/auth';
import Comments from '@/components/ui/comments';
import CommentForm from '../_components/commentForm';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const type = params.slug[0] as 'books';
  const id = params.slug[1];
  

  return (
    <Flex direction="column" gap="xl">
      <MediaDescription type={type} id={id} />
      {/* <Comments /> */}
      <Flex direction="column" gap="md">
        <Text size="xl" fw={600}>
          Comments
        </Text>
        <Divider />
        <Box maw={600} w="100%" mx="auto">
          <CommentForm id={id} type={type} />
          <Comments id={id} />
        </Box>
      </Flex>
    </Flex>
  );
}
