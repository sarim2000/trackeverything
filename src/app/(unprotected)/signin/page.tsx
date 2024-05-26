'use client';

import { getLoggedInUser, signInWithEmail, signUpWithEmail } from '@/lib/actions/user.actions';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  NumberInput,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [visible, toggle] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError(null);
    console.log(values);
    toggle.open();
    const response = await signInWithEmail(values);
    toggle.close();
    console.log(response);
    setError(response.message);
  };

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
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'san-marino', type: 'bars' }}
          />
          {
            error && (
              <Text c="red" size="sm" ta="center" mt={5}>
                {error}
              </Text>
            )
          }
          <form
            onSubmit={form.onSubmit((values) => {
              handleSignIn(values);
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
