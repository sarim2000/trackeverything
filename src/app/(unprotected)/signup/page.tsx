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
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [visible, toggle] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null)

  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', password: '' },
    validateInputOnChange: true,

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 3 ? 'Name must have at least 3 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 10 ? 'Password must have at least 10 characters' : null),
    },
  });

  const handleSignUp = async (values: any) => {
    setError(null);
    console.log(values);
    toggle.open();
    const response = await signUpWithEmail(values);
    toggle.close();
    console.log(response);
    setError(response.message);
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center">Sign Up</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => router.push('/signin')}>
            Sign in
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
              handleSignUp(values);
            })}
          >
            <TextInput
              label="Name"
              placeholder="Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
              mb={10}
            />
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
              mb={10}
              {...form.getInputProps('password')}
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
