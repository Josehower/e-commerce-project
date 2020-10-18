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
import { ProductType, CookieType, CookieObjType } from '../utils/types';

type ProductArray = { cartItems: ProductType[] };

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
//setCartAmount come from Layout Component
const Carrito = ({
  cartItemsFromProps,
  corruptCookie = false,
  setCartAmount,
}) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartItemsFromProps ? cartItemsFromProps : []);
    if (corruptCookie) {
      deleteCartCookie();
      setCartAmount(0);
    }
  }, [cartItemsFromProps, corruptCookie]);

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

  const cartCookie = nextCookies(context).cart || [];

  //make happy typescript
  const cart = [...cartCookie].map((obj) => {
    const objArr = Object.entries(obj);
    objArr.map(([key, value]: string[]) => [key, parseInt(value, 10)]);
    const newObj: CookieObjType = { qty: NaN, id: NaN, sizeId: NaN };
    objArr.forEach(([key, value]) => {
      newObj[key] = value;
    });
    return newObj;
  });

  const cartItemsOnCookie: CookieType | [] = [...cart];
  const cartItemsOnCookieIds = cartItemsOnCookie.map((item) => item.id);

  let dataBaseProduct = await getProductsById(cartItemsOnCookieIds);

  let corruptCookie = false;
  //validate the important info from cookie and validate the sizeId from cookie against the database
  cartItemsOnCookie.forEach((itemOnCookie) => {
    const referenceProduct = dataBaseProduct.find(
      (item) => item?.id === itemOnCookie?.id,
    );
    const sizeOptionsRef = referenceProduct
      ? referenceProduct.sizeOptions?.length
      : false;

    if (isObjectCookieNotWellFormated(itemOnCookie, sizeOptionsRef)) {
      dataBaseProduct = [];
      corruptCookie = true;
    }
  });

  const cartItemsFromProps: ProductArray | [] = dataBaseProduct.map(
    (product) => {
      const itemOnCookie = {
        ...cartItemsOnCookie.filter((item) => item.id === product.id)[0],
      };
      return {
        ...itemOnCookie,
        ...product,
        size: product.sizeOptions[itemOnCookie.sizeId],
      };
    },
  );
  cartItemsFromProps.forEach((item) => delete item.sizeId);

  return {
    props: {
      cartItemsFromProps,
      corruptCookie,
    },
  };
}
