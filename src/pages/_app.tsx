import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { UserProvider } from '../components/UserContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const noLayoutPaths = ['/login', '/signup'];

  // Проверяем, нужно ли использовать Layout
  const isNoLayout = noLayoutPaths.includes(router.pathname);

  return (
    <UserProvider>
      {isNoLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </UserProvider>
  );
};

export default MyApp;

