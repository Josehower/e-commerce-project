import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './Layout';

const Grid = styled.div`
  width: 100vw;
  padding: 5px;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(3, 33vw);
  grid-auto-rows: 33vw;
  justify-content: space-around;
  align-content: space-around;
  background: ${colors.secondaryLight};
`;

const Image = styled.div`
  background: white;
  background: url(${(props) => props.src}) center;
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
