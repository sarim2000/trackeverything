"use client";

import { getLoggedInUser, signInWithEmail, signUpWithEmail } from "@/lib/actions/user.actions";
import { Container, Title, Anchor, Paper, TextInput, PasswordInput, Group, Checkbox, Button, Text, NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 1 ? 'Name must have at least 1 character' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
    },


  });



  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" >
          Sign Up
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => router.push('/signin')}>
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => {

            signUpWithEmail(values);
          })} >
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

