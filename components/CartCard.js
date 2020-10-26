import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { colors } from './Layout';
import Select from 'react-select';

const colorSquare = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 3,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: '20px',
    width: '20px',
    border: `1px solid ${colors.black}`,
    boxShadow: `2px 3px ${colors.gray}`,
  },
});

const colorSelectStyle = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '80px',
    height: '50px',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...colorSquare(data.backgroundColor),
    width: '80px',
    height: '50px',
  }),
  option: (styles, { data }) => {
    return {
      ...styles,
      ...colorSquare(data.backgroundColor),
      background: colors.primaryWhite,
      width: '40px',
      padding: '5px 0',
      margin: '3px auto',
      justifyContent: 'center',
      borderRadius: 5,
    };
  },
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '50px',
    padding: '0',
    border: 'none',
    margin: '0',
    overflow: 'hidden',
  }),
  menuList: (styles) => ({
    ...styles,
    padding: '0',
    margin: '0',
  }),
};

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

  button {
    background-color: ${colors.secondaryDark};
    color: ${colors.white};
    border: none;
    border-radius: 3px;

    &:active {
      transform: scale(1.05);
    }
  }
`;

const CartCard = (props) => {
  const [cartItem, setCartItem] = useState(props.cartItem);

  function updateCartItem(keyName, newValue) {
    const updatedItem = { ...cartItem };
    updatedItem[keyName] = newValue;
    setCartItem(updatedItem);
    const updatedCart = props.updateArticle(
      updatedItem,
      props.cartItem.id,
      props.cartItems,
    );
    props.setCartItems(updatedCart);
  }

  function colorSelectorHandler(info) {
    const newColor = info.value;
    updateCartItem(info.name, newColor);
  }

  function deleteCartItem() {
    const updatedCart = props.deleteItemFromCart(cartItem.id, props.cartItems);
    props.setCartItems(updatedCart);
    props.setCartAmount(updatedCart.length);
  }

  return (
    <Card className={'cartCard'}>
      <Img src={cartItem.img} alt="blue-pants" />
      <TextCard>
        <h3>{cartItem.name}</h3>
        <label>
          Talla: &nbsp;
          <select
            id="cars"
            value={cartItem.size}
            onChange={(e) => updateCartItem('size', e.currentTarget.value)}
            onBlur={(e) => {
              return;
            }}
          >
            {cartItem.sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <Select
          options={cartItem.colorOptions.map((color, index) => {
            return {
              name: 'color',
              value: color,
              label: ' ',
              backgroundColor: color,
              placeHolder: 'select color',
            };
          })}
          defaultValue={{
            name: 'color',
            value: cartItem.color,
            label: ' ',
            backgroundColor: cartItem.color,
          }}
          value={{
            name: 'color',
            value: cartItem.color,
            label: ' ',
            backgroundColor: cartItem.color,
          }}
          onChange={colorSelectorHandler}
          styles={colorSelectStyle}
          label="color"
        />
        <label>
          Cantidad: &nbsp;
          <input
            type="number"
            min={1}
            max={99}
            value={cartItem.qty}
            onChange={(e) =>
              updateCartItem('qty', parseInt(e.currentTarget.value, 10))
            }
          />
        </label>
        <div>
          $&nbsp;
          <NumberFormat
            value={cartItem.price * cartItem.qty}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
        <button
          data-cy={`button-delete-item-from-cart-id-${cartItem.id}`}
          onClick={deleteCartItem}
        >
          Remover
        </button>
      </TextCard>
    </Card>
  );
};

export default CartCard;
