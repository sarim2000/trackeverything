'use client';

import { useState } from 'react';
import { Box, Button, Title, Paper, Group, Badge, Stack, Text } from '@mantine/core';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@src/convex/_generated/api';
import { notifications } from '@mantine/notifications';
import LoadingUI from '@/components/ui/loading-ui';
import ProfileForm from '@/components/ProfileForm';

export default function ProfilePage() {
  const userData = useQuery(api.queires.profile.getUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const updateUserProfile = useMutation(api.mutations.profile.addUserProfile);

  if (userData === undefined) {
    return <LoadingUI />;
  }

  const handleUpdateProfile = async (values: typeof userData) => {
    try {
      await updateUserProfile({
        bio: values?.bio ?? '',
        ageRange: values?.ageRange ?? '',
        favoriteGenres: values?.favoriteGenres ?? [],
        preferredMediaTypes: values?.preferredMediaTypes ?? [],
        languagePreferences: values?.languagePreferences ?? [],
      });
      notifications.show({ message: 'Profile updated successfully', color: 'green' });
      setIsEditing(false);
    } catch (error) {
      notifications.show({ message: 'Error updating profile', color: 'red' });
    }
  };

  if (userData === null || isEditing) {
    return <ProfileForm initialData={userData} onSubmit={handleUpdateProfile} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <Box maw={600} mx="auto">
      <Title order={2} mb="xl">
        Your Profile
      </Title>
      <Text c="dimmed" fz="sm" mb="md">
        A.T.L.A.S AI will reference your profile when generating content.
      </Text>
      <Paper shadow="xs" p="md" withBorder>
        <Stack>
          <ProfileField label="Bio" value={userData.bio || ''} />
          <ProfileField label="Age Range" value={userData.ageRange || ''} isBadge />
          <ProfileFieldList label="Favorite Genres" values={userData.favoriteGenres} color="green" />
          <ProfileFieldList label="Preferred Media Types" values={userData.preferredMediaTypes} color="orange" />
          <ProfileFieldList label="Language Preferences" values={userData.languagePreferences} color="grape" />
        </Stack>
      </Paper>
      <Button onClick={() => setIsEditing(true)} mt="md">
        Edit
      </Button>
    </Box>
  );
}

const ProfileField = ({ label, value, isBadge = false }: { label: string; value: string; isBadge?: boolean }) => (
  <Group align="flex-start" wrap="nowrap">
    <Text fw={700} style={{ minWidth: '150px' }}>{label}</Text>
    {isBadge ? (
      <Badge color="blue" variant="light">
        {value || 'Not specified'}
      </Badge>
    ) : (
      <Text style={{ flex: 1, wordBreak: 'break-word' }}>{value || 'Not provided'}</Text>
    )}
  </Group>
);

const ProfileFieldList = ({ label, values, color }: { label: string; values: string[]; color: string }) => (
  <Group align="flex-start">
    <Text fw={700}>{label}</Text>
    <Group gap="xs">
      {values.map((value) => (
        <Badge key={value} color={color} variant="light">
          {value}
        </Badge>
      ))}
    </Group>
  </Group>
);