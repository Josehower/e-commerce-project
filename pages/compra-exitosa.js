import Link from 'next/link';
import styled from 'styled-components';

const Div = styled.div`
  height: calc(90vh - 76px);
  min-height: 400px;
  margin: 0 auto;
  display: grid;
  align-content: center;
  justify-items: center;

  h1 {
    text-align: center;
    background: #d9b99b;
    color: beige;
    text-shadow: 1px 1px #666;
    padding: 5px;
    border-radius: 5px;
    width: 90vw;
    font-size: 1.3em;
  }

  p {
    border-radius: 5px;
    width: 90vw;
    height: 50vw;
    font-size: 1.3em;
  }
  a {
    margin-top: 20px;
    border-radius: 5px;
    border: transparent;
    background: #d9b99b;
    color: beige;
    text-shadow: 1px 1px #666;
    width: 50vw;
    font-size: 1.2em;
    padding: 5px;
    box-shadow: 2px 2px #666;
  }
`;

const Contacto = () => {
  return (
    <Div>
      <h1>EXITO!</h1>
      <br />
      <br />
      <p>
        Gracias por comprar en Liamty, tus productos seran enviados lo mas
        rapido posible! no olvides enviarnos tu recibo de pago a
        pedidos@liamty.com
      </p>
      <Link href="/">
        <a data-cy="button-back-to-store">volver a la tienda</a>
      </Link>
    </Div>
  );
};

export default Contacto;
