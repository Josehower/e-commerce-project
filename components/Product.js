import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { addItemToCart, getClientCookies } from '../utils/cookies';

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
      <Img src={product.img} alt={product.name} />
      <TextCard>
        <h3>{product.name}</h3>
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
        <div>
          $&nbsp;
          <NumberFormat
            value={product.price * product.qty}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
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
