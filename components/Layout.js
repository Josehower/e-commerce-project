import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import LinkButton from './LinkButton';

const colors = {
  primary: '#F782C2',
  primaryLight: '#C680EB',
  secondary: '#F782C2',
  white: '#F5F0F8',
  black: '#39343B',
};

const Kart = styled.img`
  width: 30px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vw 20vw;
  background: beige;

  .storeName {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 700px) {
    display: none;
  } ;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0 10vw;
  background: #c68f33;
  color: #f5f0f8;
  padding: 30px 10vw;
  display: ${(props) => (props.visible ? 'static;' : 'none;')};

  a {
    color: #951ad7;
  }
`;

const Nav = styled.nav`
  width: 30vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StoreName = styled.h2`
  font-size: 2em;
  text-decoration: none;
`;

//mobile styles---------------

const MobileHeader = styled.header`
  display: grid;
  position: fixed;
  top: 0;
  height: 10vh;
  min-height: 55px;
  width: 100vw;
  grid-template-columns: 1fr 50px 50px;
  justify-items: center;
  align-items: center;
  background: ${colors.primary};
  padding: 10px 0;
  z-index: 200;
  border-bottom: 2px solid ${colors.primary};
  color: ${colors.white};

  button {
    padding-right: 3px;
    color: #39343b;
  }

  .storeName {
    text-decoration: none;
    color: ${colors.white};
    padding-bottom: 5px;
  }

  @media (min-width: 700px) {
    display: none;
  } ;
`;
const MobileNav = styled.nav`
  position: absolute;
  width: 100vw;
  height: 90vh;
  display: grid;
  background: #f5f0f8;
  color: 951ad7;
  top: 10vh;
  padding: 30px;
  z-index: 200;
  transition: all 0.4s;
  left: ${(props) => (props.isNavActive ? '0' : '-1000px')};

  button {
    background: #f5f0f8;
    border: none;
    color: #951ad7;
  }
`;

const Space = styled.div`
  height: 10vh;
  @media (min-width: 700px) {
    display: none;
  } ;
`;

export default function Layout(props) {
  const [isNavActive, setIsNavActive] = useState(false);

  function toggle() {
    setIsNavActive(!isNavActive);
  }
  return (
    <>
      <Header version="web">
        <Link href="/">
          <a className={'storeName'}>
            <StoreName>Liamty.com</StoreName>
          </a>
        </Link>
        <Nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/tienda">
            <a>Shop</a>
          </Link>
          <Link href="#a">
            <a>About</a>
          </Link>
          <Link href="/contacto">
            <a>Contact</a>
          </Link>
          <Link href="/kart.png">
            <a>
              <Kart src="/kart.png" alt="" />
            </a>
          </Link>
        </Nav>
      </Header>
      <MobileHeader version="mobile">
        <Link href="/">
          <a className={'storeName'}>
            <StoreName>Liamty.com</StoreName>
          </a>
        </Link>
        <Link href="/carrito">
          <a>
            <Kart src="/kart.png" alt="" />
          </a>
        </Link>
        <button onClick={toggle}>X</button>
        <MobileNav isNavActive={isNavActive}>
          <LinkButton text="Home" handler={toggle} href={'/'} />
          <LinkButton text="Tienda" handler={toggle} href={'/tienda'} />
          <LinkButton text="Nosotros" handler={toggle} href={'/nosotros'} />
          <LinkButton text="Contacto" handler={toggle} href={'/contacto'} />
        </MobileNav>
      </MobileHeader>
      <Space />
      {props.children}
      <Footer visible={props.visible}>
        <h3>Liamty.com</h3>
        <Link href="/contacto">
          <a>Contacto</a>
        </Link>
      </Footer>
    </>
  );
}
