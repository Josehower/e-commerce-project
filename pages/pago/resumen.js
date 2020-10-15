import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { useState, useEffect, Fragment } from 'react';
import KartCard from '../../components/KartCard';
import {
  updateArticle,
  deleteItemFromKart,
  deleteKartCookie,
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
  const [kartItems, setKartItems] = useState([]);
  useEffect(() => {
    setKartItems(props.kartItems ? props.kartItems : []);
  }, [props.kartItems]);

  return (
    <div>
      <ProgressIndicator activeStep={3} />
      <StyledNumber>
        <h2>Total:</h2>
        <NumberFormat
          value={kartItems?.reduce((acc, { price, qty }) => {
            const itemTotal = price * qty;
            return acc + itemTotal;
          }, 0)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$ '}
        />
      </StyledNumber>
      <div>
        {kartItems?.map((kartItem, index, array) => (
          <Fragment key={`frag${kartItem.id}`}>
            <KartCard
              setKartAmount={props.setKartAmount}
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
            {array.length - 1 === index ? '' : <Hr key={`hr${kartItem.id}`} />}
          </Fragment>
        ))}
      </div>
      <NextButton>
        <Link href={'/compra-exitosa'}>
          <button
            onClick={() => {
              deleteKartCookie();
              props.setKartAmount(0);
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

  const kartItems = allCookies.kart || [];

  return {
    props: {
      kartItems,
    },
  };
}
