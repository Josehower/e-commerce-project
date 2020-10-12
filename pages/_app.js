import Layout from '../components/Layout';
import GlobalStyle from '../styles/globalStyles';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }) {

function isFooterVisible(path)
{
const pathKeyWord = path.split('/')[1]

const pathOption ={
  'pago': false,
  'administrador': false,
}

return pathOption[pathKeyWord] !== undefined ? pathOption[pathKeyWord]: "not pago or admin";

}

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
      <Layout
      isFooterVisible={isFooterVisible(router.asPath)}
      isHeaderVisible={router.asPath.split('/')[1] !== 'administrador'}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
