import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import Link from 'next/link';

const Img = styled.img`
  width: 30vw;
`;

const Card = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: 5vw 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TextCard = styled.div`
  display: grid;
  gap: 0.5em;
`;

const EditLink = styled.a`
  margin: 5px;
`;

const CheckoutReview = ({ cartItem }) => {
  return (
    <Card className={'cartCard'}>
      <Img src={cartItem.img} alt="blue-pants" />
      <TextCard>
        <h3>{cartItem.name}</h3>
        <div>Talla: &nbsp; {cartItem.size}</div>
        <div>Cantidad: &nbsp; {cartItem.qty}</div>
        <div>
          $&nbsp;
          <NumberFormat
            value={cartItem.price * cartItem.qty}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
        <Link href="/carrito">
          <EditLink>editar</EditLink>
        </Link>
      </TextCard>
    </Card>
  );
};

export default CheckoutReview;
