'use client';

import Comments from '@/components/ui/comments';
import LoadingUI from '@/components/ui/loading-ui';
import { postComment } from '@/lib/actions/postComment';
import { Button, Group, Textarea } from '@mantine/core';
import { id } from 'convex-helpers/validators';
import { useRef, useState } from 'react';
import { Notification } from '@mantine/core';

type NotificationType = {
  type: 'success' | 'error';
  message: string;
};

export default function CommentForm({ id, type }: { id: string; type: string }) {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await postComment(formData);
      console.log('Comment posted successfully', result);
      formRef.current?.reset();
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to post your comment. We will soon give you a edit feature. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (notification) {
    return (
      <Notification title={notification.type} color={notification.type === 'success' ? 'teak' : 'red'} onClose={() => setNotification(null)}>
        {notification.message}
      </Notification>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Textarea withAsterisk label="Your Comment" placeholder="Share your thoughts..." name="comment" mb="md" />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="type" value={type} />
      <Group justify="flex-end">
        <Button type="submit" loading={isSubmitting}>
          Add Review
        </Button>
      </Group>
    </form>
  );
}