'use client';
import {
  IconBooks,
  IconDeviceGamepad,
  IconHome,
  IconLogout,
  IconMovie,
  IconSettings,
} from '@tabler/icons-react';

import Link from 'next/link';
import { useState } from 'react';
import classes from './sidebar.module.css';
import { usePathname } from 'next/navigation';

import { logoutAccount } from '@/lib/actions/user.actions';

const data = [
  { link: '/', label: 'All', icon: IconHome },
  { link: '/book', label: 'Books', icon: IconBooks },
  { link: '', label: 'Movies / TV Shows', icon: IconMovie },
  { link: '', label: 'Games', icon: IconDeviceGamepad },
];

export function Sidebar({ toggle }: { toggle: () => void }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        toggle();
        setActive(item.link);
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
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </a>

        <div className={classes.link} onClick={() => logoutAccount()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}
