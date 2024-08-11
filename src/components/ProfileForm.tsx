import { AGE_RANGES, GENRES, LANGUAGES, MEDIA_TYPES } from '@/constants/profileOptions';
import { Box, TextInput, Textarea, MultiSelect, Select, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';


interface ProfileFormProps {
  initialData: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export default function ProfileForm({ initialData, onSubmit, onCancel }: ProfileFormProps) {
  const form = useForm({
    initialValues: initialData || {
      bio: '',
      favoriteGenres: [],
      preferredMediaTypes: [],
      ageRange: '',
      languagePreferences: [],
    },
    validate: {
      bio: (value) => (value.length < 2 ? 'Bio must have at least 2 characters' : null),
      favoriteGenres: (value) => (value.length === 0 ? 'Please select at least one genre' : null),
      preferredMediaTypes: (value) => (value.length === 0 ? 'Please select at least one media type' : null),
      ageRange: (value) => (!value ? 'Please select an age range' : null),
      languagePreferences: (value) => (value.length === 0 ? 'Please select at least one language' : null),
    },
  });

  return (
    <Box maw={500} mx="auto">
      <Title order={2} mb="md">
        {initialData ? 'Edit Profile' : 'Create Profile'}
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Textarea label="Bio" {...form.getInputProps('bio')} mb="md" />
        <MultiSelect label="Favorite Genres" data={GENRES} {...form.getInputProps('favoriteGenres')} mb="md" />
        <MultiSelect
          label="Preferred Media Types"
          data={MEDIA_TYPES}
          {...form.getInputProps('preferredMediaTypes')}
          mb="md"
        />
        <Select label="Age Range" data={AGE_RANGES} {...form.getInputProps('ageRange')} mb="md" />
        <MultiSelect
          label="Language Preferences"
          data={LANGUAGES}
          {...form.getInputProps('languagePreferences')}
          mb="md"
        />
        <Button type="submit" mr="md">
          {initialData ? 'Update Profile' : 'Create Profile'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
}
