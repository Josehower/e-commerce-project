import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './Layout';
import NumberFormat from 'react-number-format';

const Grid = styled.div`
  width: 100vw;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(2, 50vw);
  grid-auto-rows: calc(90vw + 4em);
  justify-content: space-around;
  align-content: space-around;
  background: ${colors.secondaryLight};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    margin-top: 3px;
    padding: 0;
  }

  h3 {
    margin-top: 0.5em;
    margin-bottom: 3px;
  }
  br {
    width: 40vw;
    background: ${colors.secondaryDark};
    content: ' ';
    padding: 1px;
    margin-bottom: 2.5em;
  }
`;

const Image = styled.img`
  background: white;
  width: 45vw;
  height: 90vw;
  background-size: cover;
  overflow: hidden;
  border-radius: 5px;
`;

function normalizeAccents(string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const GaleryLarge = (props) => {
  return (
    <Grid>
      {props.itemsArray.map((item) => {
        return (
          <Wrapper>
            <Link
              key={item.id}
              href={normalizeAccents(
                `/tienda/${item.category}/${item.name.replace(' ', '-')}-${
                  item.id
                }`,
              )}
            >
              <Image data-cy={`galery-item-id-${item.id}`} src={item.img2} />
            </Link>
            <h2>
              ${' '}
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
              />
            </h2>
            <h3>{item.name}</h3>
            <br />
          </Wrapper>
        );
      })}
    </Grid>
  );
};

export default GaleryLarge;
