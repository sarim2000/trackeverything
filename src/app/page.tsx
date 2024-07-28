/* eslint-disable @typescript-eslint/no-misused-promises */

import { redirect } from 'next/navigation';
import { auth, signIn } from '@src/auth';

export default function Home() {
  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center">Convex + Next.js + Auth.js</h1>
        <p>Here is where your marketing message goes.</p>
        <p>The user doesn&apos;t need to log in to see it.</p>
        <p>To interact with the app log in via the button up top.</p>
        <SignIn />
      </main>
    </>
  );
}

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';

        // Skip sign-in screen if the user is already signed in
        if ((await auth()) !== null) {
          redirect('/loggedin');
        }

        await signIn('google', { redirectTo: '/loggedin' });
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}
