import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { useState, useEffect, Fragment } from 'react';
import CartCard from '../../components/CartCard';
import {
  updateArticle,
  deleteItemFromCart,
  deleteCartCookie,
} from '../../utils/cookies';
import NumberFormat from 'react-number-format';

const NextButton = styled.div`
  background: ${colors.secondary};
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  text-align: center;
  border-top: 2px solid #ccc;
  button {
    background: ${colors.primary};
    color: ${colors.white};
    font-size: 24px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px #555;
    padding: 5px;
    width: 80vw;
    text-shadow: 1px 1px #666;
  }

  p {
    margin: 8px;
    color: ${colors.white};
  }
`;

const StyledNumber = styled.div`
  width: 100vw;
  position: sticky;
  top: 10vh;
  background: ${colors.primaryLight};
  margin-top: 3px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid ${colors.gray};
`;

const Hr = styled.hr`
  border-top: 3px solid ${colors.gray};
`;

const Resumen = (props) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(props.cartItems ? props.cartItems : []);
  }, [props.cartItems]);

  return (
    <div>
      <ProgressIndicator activeStep={3} />
      <StyledNumber>
        <h2>Total:</h2>
        <NumberFormat
          value={cartItems?.reduce((acc, { price, qty }) => {
            const itemTotal = price * qty;
            return acc + itemTotal;
          }, 0)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$ '}
        />
      </StyledNumber>
      <div>
        {cartItems?.map((cartItem, index, array) => (
          <Fragment key={`frag${cartItem.id}`}>
            <CartCard
              setCartAmount={props.setCartAmount}
              cartItem={cartItem}
              updateArticle={updateArticle}
              deleteItemFromCart={deleteItemFromCart}
              setCartItems={setCartItems}
              img={cartItem.img}
              price={cartItem.price}
              qty={cartItem.qty}
              size={cartItem.size}
              sizeOptions={cartItem.sizeOptions}
              key={`card${cartItem.id}`}
            />
            {array.length - 1 === index ? '' : <Hr key={`hr${cartItem.id}`} />}
          </Fragment>
        ))}
      </div>
      <NextButton>
        <Link href={'/compra-exitosa'}>
          <button
            onClick={() => {
              deleteCartCookie();
              props.setCartAmount(0);
            }}
          >
            Comprar
          </button>
        </Link>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default Resumen;

export async function getServerSideProps(context) {
  const allCookies = nextCookies(context);

  const cartItems = allCookies.cart || [];

  return {
    props: {
      cartItems,
    },
  };
}
