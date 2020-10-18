import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { useState, useEffect, Fragment } from 'react';
import CheckoutReview from '../../components/CheckoutReview';
import {
  updateArticle,
  deleteItemFromCart,
  deleteCartCookie,
  isObjectCookieNotWellFormated,
} from '../../utils/cookies';
import NumberFormat from 'react-number-format';

type ProductArray = { cartItems: ProductType[] };

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

const Resumen = ({
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
            <CheckoutReview
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
      </div>
      <NextButton>
        <Link href={'/compra-exitosa'}>
          <button
            onClick={() => {
              deleteCartCookie();
              setCartAmount(0);
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
  const { getProductsById } = await import('../../utils/dataBase');

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
