import Layout from '../components/Layout';
import GlobalStyle from '../styles/globalStyles';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getClientCookies } from '../utils/cookies';

function MyApp({ Component, pageProps, router }) {
  const [cartAmount, setCartAmount] = useState(0);

  function isFooterVisible(path) {
    const pathKeyWord = path.split('/')[1];

    const pathOption = {
      pago: false,
      administrador: false,
    };

    return pathOption[pathKeyWord] !== undefined
      ? pathOption[pathKeyWord]
      : 'not pago or admin';
  }

  useEffect(() => {
    if (getClientCookies()?.length) {
      setCartAmount(getClientCookies()?.length);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Head>
        <link rel="icon" href="/logo.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout
        isFooterVisible={isFooterVisible(router.asPath)}
        isHeaderVisible={router.asPath.split('/')[1] !== 'administrador'}
        cartAmount={cartAmount}
      >
        <Component {...pageProps} setCartAmount={setCartAmount} />
      </Layout>
    </>
  );
}

export default MyApp;
