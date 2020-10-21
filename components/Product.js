import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { addItemToCart, getClientCookies } from '../utils/cookies';
import { colors } from './Layout';

const CardHead = styled.div`
  display: grid;
  width: 100vw;
  justify-content: space-between;
  grid-template-columns: 1.5fr 1fr;
  margin: 5px auto;
  font-size: 1.2em;
  align-items: center;
  h3 {
    margin-left: 10vw;
  }
  div {
    font-weight: bold;
    font-size: 1.3em;
  }
`;

const CardOptions = styled.div`
  display: grid;
  width: 100vw;
  justify-content: space-around;
  grid-template-columns: 1fr 1fr;

  label {
    margin-top: 5px;
    margin: 5px 0 0 10vw;
  }
`;

const Img = styled.img`
  width: 85vw;
`;

const Card = styled.div`
  width: 100vw;
  background: ${colors.white};
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  button {
    margin: 0 auto 0.5em;
    background: ${colors.primary};
    color: ${colors.white};
    padding: 5px;
    font-size: 1.5em;
    width: 90vw;
    border-radius: 3px;
    border: transparent 1px solid;
    box-shadow: 2px 2px ${colors.secondary};
  }

  button:active {
    transform: scale(1.02);
  }
  button:focus {
    outline: none;
    background: ${colors.primaryDark};
  }
`;

const TextCard = styled.div`
  display: grid;
  gap: 1em;
`;

const Product = (props) => {
  const [product, setProduct] = useState({
    id: 1,
    img: '/pants/blue-pants.jpg',
    price: 20000,
    qty: 1,
    size: 'M',
    name: 'blue pants',
    sizeOptions: ['XL', 'L', 'M', 'S'],
    category: 'pants',
  });

  function updateState(keyName, newValue) {
    const updatedState = { ...product };
    updatedState[keyName] = newValue;
    setProduct(updatedState);
  }

  useEffect(() => {
    if (props.productId) {
      setProduct(
        props.inventory.find((item) => {
          return props.productId === item.id;
        }),
      );
    }
  }, [props.productId, props.inventory]);

  return (
    <Card>
      <CardHead>
        <h3>{product.name}</h3>
        <div>
          $&nbsp;
          <NumberFormat
            value={product.price * product.qty}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
      </CardHead>
      <Img src={product.img} alt={product.name} />
      <TextCard>
        <CardOptions>
          <label>
            Talla: &nbsp;
            <select
              id="pants"
              value={product.size}
              onChange={(e) => updateState('size', e.currentTarget.value)}
              onBlur={(e) => {
                return;
              }}
            >
              {product.sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad: &nbsp;
            <input
              data-cy="input-qty-items-to-cart"
              type="number"
              min={1}
              max={99}
              placeholder="qty"
              value={product.qty}
              onChange={(e) =>
                updateState('qty', parseInt(e.currentTarget.value, 10))
              }
            />
          </label>
        </CardOptions>
        <button
          data-cy={'button-add-to-cart'}
          onClick={() => {
            addItemToCart(product);
            props.setCartAmount(getClientCookies().length);
          }}
        >
          agregar al carrito
        </button>
      </TextCard>
    </Card>
  );
};

export default Product;
