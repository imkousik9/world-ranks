import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { MdBrightness6 } from 'react-icons/md';

import Logo from '../icons/Logo';
import styles from './Layout.module.css';

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: Props) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme');
    }
  });

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const switchTheme = () => {
    if (theme !== 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <NextLink href="/">
          <a>
            <Logo />
          </a>
        </NextLink>

        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <MdBrightness6 />
        </button>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
