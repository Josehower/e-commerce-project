import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import LinkButton from './LinkButton';

export const colors = {
  primary: '#C179EB',
  primaryLight: '#E3C7F1',
  primaryWhite: '#E3C7F1',
  secondary: '#818FEB',
  white: '#FCF7FF',
  black: '#262427',
  gray: '#ABAAAC',
};

const Kart = styled.img`
  width: 30px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vw 20vw;
  background: url('/jaspe.jpg') ${colors.primary} center;
  background-size: cover;
  background-blend-mode: soft-light;

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
  background: ${colors.secondary};
  color: ${colors.white};
  padding: 30px 10vw;
  display: ${(props) => (props.visible ? 'static;' : 'none;')};

  a {
    color: ${colors.primaryLight};
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
  background: url('/jaspe.jpg') ${colors.primary} center;
  background-size: cover;
  background-blend-mode: soft-light;
  padding: 10px 0;
  z-index: 200;
  border-bottom: 2px solid ${colors.secondary};
  color: ${colors.white};
  display: ${(props) => (props.visible ? 'static;' : 'none;')};

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
    background: ${colors.primaryLight};
    border: none;
    color: #951ad7;
  }
`;

const Space = styled.div`
  height: 10vh;
  display: ${(props) => (props.visible ? 'static;' : 'none;')};
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
          <span data-cy="number-kart-nav-web">{props.kartAmount}</span>
          <Link href="/kart.png">
            <a>
              <Kart src="/kart.png" alt="" />
            </a>
          </Link>
        </Nav>
      </Header>
      <MobileHeader version="mobile" visible={props.isHeaderVisible}>
        <Link href="/">
          <a className={'storeName'}>
            <StoreName>Liamty.com</StoreName>
          </a>
        </Link>
        <Link href="/carrito">
          <a>
            <span data-cy="number-kart-nav-mobile">{props.kartAmount}</span>
            <Kart data-cy="icon-kart-nav-mobile" src="/kart.png" alt="" />
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
      <Space visible={props.isHeaderVisible} />
      {props.children}
      <Footer visible={props.isFooterVisible}>
        <h3>Liamty.com</h3>
        <Link href="/contacto">
          <a>Contacto</a>
        </Link>
      </Footer>
    </>
  );
}
