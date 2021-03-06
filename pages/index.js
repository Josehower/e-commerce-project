import Head from 'next/head';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Galery from '../components/Galery';
import GaleryLarge from '../components/GaleryLarge';
import { colors } from '../components/Layout';

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
  background: #fcf7ff;
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
    color: #818feb;
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 0 -0.5rem 30vw;
  width: 70vw;
  background: ${colors.secondary};
  padding: 0.5rem 0 0.5rem 5vw;
  position: relative;
  top: -18px;

  a {
    display: inline-block;
    border: solid 1px ${colors.primaryLight};
    color: ${colors.white};
    background: ${colors.primary};
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

export default memo(function Home({ squareGaleryProps, largeGaleryProps }) {
  const [squareGalery, setSquareGalery] = useState([]);
  const [largeGalery, setLargeGalery] = useState([]);

  useEffect(() => {
    setSquareGalery(squareGaleryProps);
    setLargeGalery(largeGaleryProps);
  }, [largeGaleryProps, squareGaleryProps]);

  return (
    <>
      <Head>
        <title>liamty.com</title>
      </Head>
      <HeroImage />
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
        <img src="/50-off.jpeg" alt="" />
        <br />
        <br />
        <h1>Descubre nuestras ofertas</h1>
        <br />
        <p>
          Productos de la mejor calidad, al mejor precio, seleccionados para una
          mujer moderna.
        </p>
      </Section>
      <Galery itemsArray={squareGalery} />
      <GaleryLarge itemsArray={largeGalery} />
      <Section />
    </>
  );
});

export async function getServerSideProps() {
  const { getInventory } = await import('../utils/dataBase');

  const inventory = await getInventory();

  const choosenNumbers = [];

  function randomInventoryIndex() {
    const randomIndex = Math.floor(Math.random() * inventory.length);

    if (choosenNumbers.includes(randomIndex)) {
      return randomInventoryIndex();
    } else {
      choosenNumbers.push(randomIndex);

      return randomIndex;
    }
  }

  const squareGaleryProps = [
    randomInventoryIndex(),
    randomInventoryIndex(),
    randomInventoryIndex(),
    randomInventoryIndex(),
    randomInventoryIndex(),
    randomInventoryIndex(),
  ].map((index) => {
    return { ...inventory[index] };
  });

  const largeGaleryProps = [randomInventoryIndex(), randomInventoryIndex()].map(
    (index2) => {
      return { ...inventory[index2] };
    },
  );

  return {
    props: {
      squareGaleryProps,
      largeGaleryProps,
    },
  };
}
