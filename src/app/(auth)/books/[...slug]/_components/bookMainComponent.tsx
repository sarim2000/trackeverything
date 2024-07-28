'use client';
import { Badge, Box, Button, Card, Container, Flex, Group, Image, Text, Title } from '@mantine/core';
import { Notification, rem } from '@mantine/core';
import { api } from '@src/convex/_generated/api';
import { IconArrowRight, IconBook, IconPhoto } from '@tabler/icons-react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { useState } from 'react';

type NotificationType = {
  type: 'success' | 'error';
  message: string;
};

export default function BookMainComponent({
  id,
  description,
  title,
  cover_img,
  subjects,
}: {
  id: string;
  description: string;
  title: string;
  cover_img: string;
  subjects: string[];
}) {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [isLoading, setIsLoading] = useState(false);
  const addBookMutation = useMutation(api.mutations.books.addBook);

  const handleAddBook = async () => {
    setIsLoading(true);
    try {
      await addBookMutation({ id, title, description, cover_img });
      setNotification({ type: 'success', message: 'Book added successfully!' });
    } catch (error) {
      
      setNotification({
        type: 'error',
        message: error instanceof ConvexError ? (error.data as ({message: string})).message : 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction={'column'} align={'center'} gap={'lg'}>
      {notification && (
        <Notification
          icon={notification.type === 'error' ? xIcon : checkIcon}
          color={notification.type === 'error' ? 'red' : 'green'}
          title={notification.type === 'error' ? 'Bummer!' : 'Great!'}
          onClose={() => setNotification(null)}
          
        >
          {notification.message}
        </Notification>
      )}
      <Box>
        <Title order={1}>{title}</Title>
      </Box>
      <Container fluid>
        <Image fit="fill" src={cover_img} height={320} alt={title} />
      </Container>
      <Box>

        <Button
          onClick={handleAddBook}
          variant="light"
          leftSection={<IconBook size={14} />}
          rightSection={<IconArrowRight size={14} />}
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </Box>
      <Box style={{ width: '100%' }}>
        <Flex wrap={'wrap'} gap={'md'} align={'center'}>
          {subjects.slice(0, 5).map((subject) => (
            <Badge key={subject}>{subject}</Badge>
          ))}
        </Flex>
      </Box>
      <Box style={{ width: '100%' }}>
        <Title order={3}>{description}</Title>
      </Box>
    </Flex>
  );
}
