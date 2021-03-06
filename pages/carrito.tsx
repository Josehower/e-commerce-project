import styled from 'styled-components';
import CartCard from '../components/CartCard';
import NumberFormat from 'react-number-format';
import { useState, useEffect, Fragment } from 'react';
import nextCookies from 'next-cookies';
import {
  updateArticle,
  deleteItemFromCart,
  isObjectCookieNotWellFormated,
  deleteCartCookie,
} from '../utils/cookies';
import Link from 'next/link';
import { colors } from '../components/Layout';
import cartSum from '../utils/cartSum';
import { ProductType, CookieType } from '../utils/types';
import { GetServerSidePropsContext } from 'next';

type CarritoPropsTypes = {
  cartItemsFromProps: ProductType[];
  corruptCookie: Boolean;
  setCartAmount: Function;
};

const Div = styled.div`
  position: sticky;
  bottom: 0;
  width: 100vw;
  background: white;
  display: flex;
  justify-content: space-around;
  border-top: 3px black solid;
  padding: 5vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  color: ${colors.secondaryDark};
  font-weight: bolder;
  font-size: 1.2em;
  text-align: center;

  button {
    grid-column: span 2;
    background-color: ${colors.primary};
    padding: 8px;
    border: none;
    border-radius: 5px;
    color: ${colors.white};
    font-family: 'Sansita Swashed', cursive;
    font-weight: bolder;
    font-size: 1.4em;
    text-shadow: 1px 1px ${colors.black};
    box-shadow: 2px 2px ${colors.secondaryDark};
  }
`;
const Hr = styled.hr`
  border-top: 3px solid ${colors.gray};
`;

const ProductsWrapper = styled.div`
  min-height: 80vh;
  background: ${colors.white};
`;
//setCartAmount come from Layout Component
const Carrito = ({
  cartItemsFromProps,
  corruptCookie = false,
  setCartAmount,
}: CarritoPropsTypes) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(cartSum(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartItems(cartItemsFromProps ? cartItemsFromProps : []);
    setTotalPrice(cartSum(cartItemsFromProps ? cartItemsFromProps : []));
    if (corruptCookie) {
      deleteCartCookie();
      setCartAmount(0);
    }
  }, [cartItemsFromProps, corruptCookie, setCartAmount]);

  return (
    <>
      <ProductsWrapper data-cy="product-wrapper-on-cart">
        {cartItems?.map((cartItem: ProductType, index, array) => (
          <Fragment key={`frag${cartItem.id}`}>
            <CartCard
              setCartAmount={setCartAmount}
              cartItem={cartItem}
              updateArticle={updateArticle}
              deleteItemFromCart={deleteItemFromCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
              key={`card${cartItem.id}`}
            />
            {array.length - 1 === index ? '' : <Hr key={`hr${cartItem.id}`} />}
          </Fragment>
        ))}
      </ProductsWrapper>
      <Div>
        <h2>Total:</h2>
        <div>
          $
          <NumberFormat
            value={totalPrice}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
        <Link href={'/pago/informacion'}>
          <button data-cy="button-buy-cart">Comprar</button>
        </Link>
      </Div>
    </>
  );
};
export default Carrito;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getProductsById } = await import('../utils/dataBase');

  const cartCookie: CookieType =
    ((nextCookies(context).cart as unknown) as CookieType) || [];

  const cartItemsOnCookieIds = cartCookie.map((item) => item.id);

  let dataBaseProduct = await getProductsById(cartItemsOnCookieIds);

  let corruptCookie = false;
  //validate the important info from cookie and validate the sizeId from cookie against the database
  cartCookie.forEach((itemOnCookie) => {
    const referenceProduct = dataBaseProduct.find(
      (item) => item?.id === itemOnCookie?.id,
    );
    const sizeOptionsRef = referenceProduct
      ? referenceProduct.sizeOptions?.length
      : false;

    const colorOptionsRef = referenceProduct
      ? referenceProduct.colorOptions?.length
      : false;

    if (
      isObjectCookieNotWellFormated(
        itemOnCookie,
        sizeOptionsRef,
        colorOptionsRef,
      )
    ) {
      dataBaseProduct = [];
      corruptCookie = true;
    }
  });

  const cartItemsFromProps: ProductType[] = dataBaseProduct.map((product) => {
    const itemOnCookie = {
      ...cartCookie.filter((item) => item.id === product.id)[0],
    };
    return {
      ...itemOnCookie,
      ...product,
      size: product.sizeOptions[itemOnCookie.sizeId],
      color: product.colorOptions[itemOnCookie.colorId],
    };
  });
  cartItemsFromProps.forEach((item) => {
    delete item.sizeId;
    delete item.colorId;
  });

  return {
    props: {
      cartItemsFromProps,
      corruptCookie,
    },
  };
}
