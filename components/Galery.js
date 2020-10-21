import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './Layout';

const Grid = styled.div`
  width: 100vw;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 30vw);
  grid-auto-rows: 30vw;
  justify-content: space-around;
  align-content: space-around;
  background: ${colors.secondaryLight};
`;

const Image = styled.div`
  background: white;
  background: url(${(props) => props.src}) center;
  background-size: cover;
  overflow: hidden;
`;

function normalizeAccents(string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const Galery = (props) => {
  return (
    <Grid>
      {props.itemsArray.map((item) => (
        <Link
          key={item.id}
          href={normalizeAccents(
            `/tienda/${item.category}/${item.name.replace(' ', '-')}-${
              item.id
            }`,
          )}
        >
          <Image data-cy={`galery-item-id-${item.id}`} src={item.img} />
        </Link>
      ))}
    </Grid>
  );
};

export default Galery;
