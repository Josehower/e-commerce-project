import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import LinkButton from './LinkButton';

export const colors = {
  primary: '#C179EB',
  primaryLight: '#D099F0',
  primaryWhite: '#E3C7F1',
  primaryDark: '#774296',
  secondaryLight: '#B6BDED',
  secondary: '#818FEB',
  secondaryDark: '#5662B1',
  white: '#FCF7FF',
  black: '#262427',
  gray: '#ABAAAC',
};

const CartLink = styled.a`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 1em;

  span {
    color: ${colors.primary};
    grid-row: 1;
    grid-column: 1;
    z-index: 2;
    margin-top: 12px;
    font-weight: bold;
  }
  img {
    grid-row: 1;
    grid-column: 1;
  }

  &:active {
    transform: scale(1.1);
  }
`;

const Cart = styled.img`
  width: 35px;
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
  background: ${colors.secondaryDark};
  color: ${colors.white};
  padding: 30px 10vw;
  display: ${(props) => (props.visible ? 'static;' : 'none;')};

  a {
    color: ${colors.primaryWhite};
    font-size: 1.1em;
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
  background: ${colors.white};
  color: 951ad7;
  top: 10vh;
  padding: 30px;
  z-index: 200;
  transition: all 0.4s;
  left: ${(props) => (props.isNavActive ? '0' : '-1000px')};

  button {
    background: ${colors.primaryLight};
    border: 2px solid ${colors.white};
    border-radius: 5px;
    color: ${colors.white};
    font-family: 'Sansita Swashed', cursive;
    font-size: 1.5em;
    text-shadow: 2px 2px ${colors.secondaryDark};
  }
`;

const Space = styled.div`
  height: 10vh;
  display: ${(props) => (props.visible ? 'static;' : 'none;')};
  @media (min-width: 700px) {
    display: none;
  } ;
`;

const Hamburger = styled.div`
  width: 26px;
  height: 5px;
  transition: 0.3s ease;
  background: ${(props) =>
    props.isNavActive ? 'transparent' : `${colors.white}`};
  border-radius: 3px;

  &::before {
    content: '';
    width: 26px;
    height: 5px;
    background: ${colors.white};
    position: absolute;
    transition: 0.3s ease;
    transform: translate(-13px, -10px);
    border-radius: 3px;
    ${(props) =>
      props.isNavActive ? 'transform: translate(-13px, 0) rotate(-45deg);' : ''}
  }

  &::after {
    content: '';
    width: 26px;
    height: 5px;
    background: ${colors.white};
    position: absolute;
    transition: 0.3s ease;
    transform: translate(-13px, 10px);
    border-radius: 3px;
    ${(props) =>
      props.isNavActive ? 'transform: translate(-13px, 0) rotate(45deg);' : ''}
  }
`;
const HamburguerButton = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  transition: 0.2s ease;
  border: solid
    ${(props) => (props.isNavActive ? `${colors.white}` : 'transparent')} 3px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50%;
  padding: 3px;

  &:focus {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
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
          <span data-cy="number-cart-nav-web">{props.cartAmount}</span>
          <Link href="/cart.png">
            <a>
              <Cart src="/Cart.png" alt="" />
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
          <CartLink>
            <span data-cy="number-cart-nav-mobile">{props.cartAmount}</span>
            <Cart data-cy="icon-cart-nav-mobile" src="/Cart.png" alt="" />
          </CartLink>
        </Link>
        <HamburguerButton onClick={toggle} isNavActive={isNavActive}>
          <Hamburger isNavActive={isNavActive} />
        </HamburguerButton>
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
