import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Galery from '../components/Galery';
import inventory from '../utils/dataBase';

const HeroImage = styled.div`
  width: 100vw;
  height: 80vh;
  background: url('/store.jpg') no-repeat;
  background-color: #f5f0f8;
  background-blend-mode: darken;
  background-size: cover;
  position: fixed;
  z-index: -1;
  top: 0;
`;

const TextoBanner = styled.div`
  display: block;
  background: #f5f0f8;
  width: 80vw;
  margin: 2vh 0 0;
  padding: 0.8rem 1rem 1.5rem 3rem;
  text-align: center;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: #39343b;

  span {
    font-weight: bold;
    text-decoration: underline;
    color: #f782c2;
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 0 -0.5rem 30vw;
  width: 70vw;
  background: #f9c46b;
  padding: 0.5rem 0 0.5rem 5vw;
  position: relative;
  top: -18px;

  a {
    display: inline-block;
    border: solid 2px #c680eb;
    background: #c680eb;
    color: #f5f0f8;
    font-weight: bold;
    text-decoration: none;
    padding: 0.3em;
    border-radius: 3px;
  }
`;

const Section = styled.section`
  background: #f5f0f8;
  padding: 20px 5vw;
  color: #39343b;

  img {
    width: 90vw;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>liamty.com</title>
      </Head>
      <HeroImage></HeroImage>
      <TextoBanner>
        Bienvenida a &nbsp;<span>Liamty</span>&nbsp; tu nueva tienda online
        favorita
      </TextoBanner>
      <ButtonContainer>
        <Link href="/tienda">
          <a>Ver Productos</a>
        </Link>
      </ButtonContainer>
      <Section>
        <h2>Descuentos por temporada</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          dolorum error ex dignissimos in officia tenetur non voluptas labore
          incidunt.
        </p>
        <br />
        <img src="/50-off.jpeg" alt="" />
      </Section>
      <Galery itemsArray={inventory} />
      <Section></Section>
    </>
  );
}
