import { Box, Button, Divider, Flex, Group, Text, TextInput, Textarea } from '@mantine/core';
import MediaDescription from '../../_components/mediaDescription';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@src/convex/_generated/api';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = await auth();
  const type = params.slug[0] as 'books';
  const id = params.slug[1];

  async function createComment(formData: FormData) {
    'use server';

    const rawFormData = {
      comment: formData.get('comment'),
    };
    console.log("🚀 ~ createComment ~ rawFormData:", rawFormData)
    await fetchMutation(
      api.mutations.comments.createComment,
      {
        content: formData.get('comment') as string,
        mediaId: id,
        mediaType: type,
      },
      { token: session?.convexToken }
    );
    
    
    // mutate data
    // revalidate cache
  }

  return (
    <Flex direction="column" gap="xl">
      <MediaDescription type={type} id={id} />
      {/* <Comments /> */}
      <Flex direction="column" gap="md">
        <Text size="xl" fw={600}>Comments</Text>
        <Divider />
        <Box maw={600} w="100%" mx="auto">
          <form action={createComment}>
            <Textarea withAsterisk label="Your Comment" placeholder="Share your thoughts..." name="comment" mb="md" />
            <Group justify="flex-end">
              <Button type="submit">Submit Comment</Button>
            </Group>
          </form>
        </Box>
        
      </Flex>
    </Flex>
  );
}


