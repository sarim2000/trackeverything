'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
      }}
      variant="default"
      size="md"
      aria-label="Toggle color scheme"
    >
      <IconSun className={`${classes.icon} ${classes.light}`} stroke={1.5} />
      <IconMoon className={`${classes.icon} ${classes.dark}`} stroke={1.5} />
    </ActionIcon>
  );
}
