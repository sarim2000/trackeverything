'use client';

import { getLoggedInUser, signInWithEmail, signUpWithEmail } from '@/lib/actions/user.actions';
import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Text,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validateInputOnChange: true,

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
    },
  });

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center">Welcome back!</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Don't have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={() => router.push('/signup')}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit((values) => {
              signInWithEmail(values);
            })}
          >
            <TextInput
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
              mb={10}
            />
            <TextInput
              mt="sm"
              type="password"
              label="Password"
              placeholder="Password"
              key={form.key('password')}
              {...form.getInputProps('password')}
              mb={10}
            />

            <Button type="submit" mt="sm">
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
