import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<Theme>('dark');

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    // This is a simple way to toggle the theme, but in a real application, you might want to use a more robust solution, such as context or a state management library, to handle theme changes across the entire application.
    // const root = document.documentElement;
    // root.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      console.log('function clean up, because stack');
    };
  }, [theme]);

  return (
    <>
      <nav className={styles.menu}>
        <a
          className={styles.menuLink}
          href='#'
          arial-label='Go to home page'
          title='Home'
        >
          <HouseIcon />
        </a>
        <a
          className={styles.menuLink}
          href='#'
          arial-label='Go to history page'
          title='History'
        >
          <HistoryIcon />
        </a>
        <a
          className={styles.menuLink}
          href='#'
          arial-label='Go to settings page'
          title='Settings'
        >
          <SettingsIcon />
        </a>
        <a
          className={styles.menuLink}
          href='#'
          arial-label='Change theme mode'
          title='Change theme mode'
          onClick={handleThemeChange}
        >
          <SunIcon />
        </a>
      </nav>
    </>
  );
}
