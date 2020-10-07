import Layout from '../components/Layout';
import GlobalStyle from '../styles/globalStyles';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }) {
  console.log(router.asPath.split('/')[1]);
  return (
    <>
      <GlobalStyle />
      <Head>
        <link rel="icon" href="/logo.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout visible={router.asPath.split('/')[1] !== 'pago'}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
