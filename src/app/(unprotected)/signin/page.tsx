"use client";

import { getLoggedInUser, signInWithEmail, signUpWithEmail } from "@/lib/actions/user.actions";
import { Container, Title, Anchor, Paper, TextInput, PasswordInput, Group, Checkbox, Button, Text, NumberInput } from "@mantine/core";
import { redirect } from "next/navigation";
import { useForm } from '@mantine/form';


export default function SignUpPage() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
    },

    
  });



  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" >
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => {
            
            signInWithEmail(values);
          })}>
            <TextInput
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              mt="sm"
              label="Password"
              placeholder="Password"
              key={form.key('password')}
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

