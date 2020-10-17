import styled from 'styled-components';
import CartCard from '../components/CartCard';
import NumberFormat from 'react-number-format';
import { useState, useEffect, Fragment } from 'react';
import nextCookies from 'next-cookies';
import { updateArticle, deleteItemFromCart } from '../utils/cookies';
import Link from 'next/link';
import { colors } from '../components/Layout';
import cartSum from '../utils/cartSum';

const Div = styled.div`
  position: sticky;
  bottom: 0;
  width: 100vw;
  background: white;
  display: flex;
  justify-content: space-around;
  border-top: 3px black solid;
  padding: 5vw;
`;
const Hr = styled.hr`
  border-top: 3px solid ${colors.gray};
`;

const ProductsWrapper = styled.div`
  min-height: 80vh;
`;

const Carrito = (props) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(props.cartItems ? props.cartItems : []);
  }, [props.cartItems]);

  return (
    <>
      <ProductsWrapper data-cy="product-wrapper-on-cart">
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
      </ProductsWrapper>
      <Div>
        <Link href={'/pago/informacion'}>
          <button>Comprar</button>
        </Link>
        <h2>Total:</h2> $
        <NumberFormat
          value={cartSum(cartItems)}
          displayType={'text'}
          thousandSeparator={true}
        />
      </Div>
    </>
  );
};
export default Carrito;

export async function getServerSideProps(context) {
  const { getProductsById } = await import('../utils/dataBase');

  const allCookies = nextCookies(context);
  // Use "|| []" in order to use a default
  // value, in case this is undefined
  const cartItemsOnCookie = allCookies.cart || [];
  const cartItemsOnCookieIds = cartItemsOnCookie.map((item) => item.id);

  //TODO 1. validate Important info from the cart ID and Qty size match whit an id.

  const dataBaseProduct = await getProductsById(cartItemsOnCookieIds);

  const cartItems = dataBaseProduct.map((product) => {
    const itemOnCookie = {
      ...cartItemsOnCookie.filter((item) => item.id === product.id)[0],
    };
    console.log('ItemonCOOKIE', itemOnCookie);
    return {
      ...itemOnCookie,
      ...product,
      size: product.sizeOptions[itemOnCookie.sizeId],
    };
  });

  return {
    props: {
      cartItems,
    },
  };
}
