import { theme } from '@/lib/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@/styles/global.css';
import { auth } from '@/auth';
import ConvexClientProvider from '@/lib/context/ConvexClientProvider';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'TrackEverything',
  description: 'Track your books, movies, tv and games all in one place',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ConvexClientProvider session={session}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            {/* <NavigationProgress size={24}/> */}
            {children}
            <Analytics />
            <Notifications />
          </MantineProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
