"use client";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { NavbarSimple } from "@/components/Sidebar/Sidebar";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Structure({children}: {children: React.ReactNode;}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{
        height: { base: 60, md: 60, lg: 60 },
      }}
      navbar={{
        width: { base: 200, md: 300, lg: 300 },
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <p>Track Everything</p>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSimple toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
