"use client"
import {
  IconBooks,
  IconDeviceGamepad,
  IconHome,
  IconLogout,
  IconMovie,
  IconSettings
} from "@tabler/icons-react";

import Link from "next/link";
import { useState } from "react";
import classes from "./Sidebar.module.css";

const data = [
  { link: "/", label: "All", icon: IconHome },
  { link: "book", label: "Books", icon: IconBooks },
  { link: "", label: "Movies / TV Shows", icon: IconMovie },
  { link: "", label: "Games", icon: IconDeviceGamepad },
];

export function NavbarSimple({toggle}: {toggle: () => void;}) {
  const [active, setActive] = useState("Books");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        toggle();
        setActive(item.label);
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
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
