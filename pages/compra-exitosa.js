import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../components/Layout';

const Div = styled.div`
  height: calc(90vh - 76px);
  min-height: 400px;
  margin: 0 auto;
  display: grid;
  align-content: center;
  justify-items: center;
  background: ${colors.white};

  h1 {
    text-align: center;
    background: ${colors.secondary};
    color: ${colors.white};
    text-shadow: 1px 1px #666;
    padding: 5px;
    border-radius: 5px;
    width: 70vw;
    font-size: 1.3em;
  }

  p {
    border-radius: 5px;
    width: 90vw;
    height: 50vw;
    font-size: 1.3em;
    line-height: 1.2em;
    text-align: center;
    background: ${colors.primaryWhite};
    padding: 5vw;

    span {
      color: ${colors.secondaryDark};
    }
  }
  a {
    margin-top: 20px;
    border-radius: 5px;
    border: transparent;
    background: ${colors.primary};
    color: ${colors.white};
    text-shadow: 1px 1px ${colors.black};
    width: 90vw;
    text-decoration: none;
    text-align: center;
    font-size: 1.5em;
    padding: 8px;
    box-shadow: 2px 2px ${colors.secondaryDark};
    font-family: 'Sansita Swashed', cursive;
    font-weight: bolder;

    &:hover,
    &:active {
      transform: scale(1.02);
      background: ${colors.primaryDark};
    }
    &:focus {
      background: ${colors.primaryDark};
    }
  }
`;

const Contacto = () => {
  return (
    <Div>
      <h1>EXITO!</h1>
      <br />
      <br />
      <p>
        Gracias por comprar en <span>Liamty,</span> tus productos seran enviados
        lo mas rapido posible! no olvides enviarnos tu recibo de pago a <br />
        <br />
        <span>pedidos@liamty.com</span>
      </p>
      <Link href="/">
        <a data-cy="button-back-to-store">volver a la tienda</a>
      </Link>
    </Div>
  );
};

export default Contacto;
