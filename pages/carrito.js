import styled from 'styled-components';
import KartCard from '../components/KartCard';
import NumberFormat from 'react-number-format';
import { useState, useEffect, Fragment } from 'react';
import nextCookies from 'next-cookies';
import { updateArticle, deleteItemFromKart } from '../utils/cookies';

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

const Carrito = (props) => {
  const [kartItems, setKartItems] = useState([]);
  useEffect(() => {
    setKartItems(props.kartItems ? props.kartItems : []);
  }, [props.kartItems]);
  return (
    <>
      {kartItems?.map((kartItem, index, array) => (
        <Fragment key={`frag${kartItem.id}`}>
          <KartCard
            kartItem={kartItem}
            updateArticle={updateArticle}
            deleteItemFromKart={deleteItemFromKart}
            setKartItems={setKartItems}
            img={kartItem.img}
            price={kartItem.price}
            qty={kartItem.qty}
            size={kartItem.size}
            sizeOptions={kartItem.sizeOptions}
            key={`card${kartItem.id}`}
          />
          {array.length - 1 === index ? '' : <hr key={`hr${kartItem.id}`} />}
        </Fragment>
      ))}
      <Div>
        <button>Comprar</button>
        <h2>Total:</h2> $
        <NumberFormat
          value={kartItems?.reduce((acc, { price, qty }) => {
            const itemTotal = price * qty;
            return acc + itemTotal;
          }, 0)}
          displayType={'text'}
          thousandSeparator={true}
        />
      </Div>
    </>
  );
};
export default Carrito;

export async function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  // Use "|| []" in order to use a default
  // value, in case this is undefined
  const kartItems = allCookies.kart || [];

  return {
    props: {
      kartItems,
    },
  };
}
