import { memo } from 'react';
import styled from 'styled-components';
import Galery from '../../components/Galery';
import { colors } from '../../components/Layout';

const H1 = styled.h1`
  padding: 10px 0 5px 5vw;
  font-size: 1.5em;
  text-transform: capitalize;
`;
const Wrapper = styled.div`
  background-color: ${colors.white};
`;

const tienda = memo(({ inventory, categoryList }) => {
  return categoryList.map((category) => {
    return (
      <Wrapper key={category}>
        <H1>{category}</H1>
        <Galery
          itemsArray={inventory.filter((item) => item.category === category)}
        />
      </Wrapper>
    );
  });
});

export default tienda;

export async function getServerSideProps() {
  const { getInventory, getCategories } = await import('../../utils/dataBase');

  const inventory = await getInventory();
  const categoryList = await getCategories();

  return {
    props: {
      inventory,
      categoryList,
    },
  };
}
