// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import Structure from "@/components/Structure/Structure";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

export const metadata = {
  title: "My tracker app",
  description: "working hopefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Structure>{children}</Structure>
        </MantineProvider>
      </body>
    </html>
  );
}
