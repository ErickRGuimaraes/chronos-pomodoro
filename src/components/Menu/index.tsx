import type React from 'react';
import { useEffect, useState } from 'react';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';

import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

type Theme = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    return storedTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    return () => {
      console.log('function clean up, because stack');
    };
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href='/'
        aria-label='Go to home page'
        title='Home'
      >
        <HouseIcon />
      </RouterLink>

      <RouterLink
        className={styles.menuLink}
        href='/history'
        aria-label='Go to history page'
        title='History'
      >
        <HistoryIcon />
      </RouterLink>

      <RouterLink
        className={styles.menuLink}
        href='/settings'
        aria-label='Go to settings page'
        title='Settings'
      >
        <SettingsIcon />
      </RouterLink>

      <RouterLink
        className={styles.menuLink}
        href='#'
        aria-label='Change theme mode'
        title='Change theme mode'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
