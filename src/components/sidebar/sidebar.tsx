'use client';
import { IconBooks, IconDeviceGamepad, IconHome, IconLogout, IconMovie, IconSettings,IconMessageChatbot } from '@tabler/icons-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import classes from './sidebar.module.css';

import { Button } from '@mantine/core';
import { signOut } from 'next-auth/react';


const data = [
  { link: '/atlas-ai', label: 'A.T.L.A.S AI', icon: IconMessageChatbot },
  { link: '/home', label: 'Home', icon: IconHome },
  { link: '/books', label: 'Books', icon: IconBooks },
  { link: '', label: 'Movies / TV Shows', icon: IconMovie },
  { link: '', label: 'Games', icon: IconDeviceGamepad },
];

export function Sidebar({ toggle }: { toggle: () => void }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  console.log("🚀 ~ Sidebar ~ active:", active)

  

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={pathname === item.link}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        toggle();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {/* <Group className={classes.header} justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group> */}
        {links}
      </div>

      <div className={classes.footer}>
        <Link className={classes.link} href="/profile">
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Profiles</span>
        </Link>

        <Button className={classes.link} variant="subtle" onClick={() => signOut()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}
