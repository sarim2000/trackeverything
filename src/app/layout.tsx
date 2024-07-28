import { theme } from '@/lib/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';
import { auth } from '@src/auth';
import ConvexClientProvider from '@/lib/context/ConvexClientProvider';

export const metadata = {
  title: 'TrackeEverything',
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
            <NavigationProgress />
            {children}
          </MantineProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
