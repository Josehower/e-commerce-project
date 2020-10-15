import { memo } from 'react';
import styled from 'styled-components';
import Galery from '../../components/Galery';

const H1 = styled.h1`
  margin: 5px 0;
`;

const tienda = memo(({ inventory, categoryList }) => {
  return categoryList.map((category) => {
    return (
      <div key={category}>
        <H1>{category}</H1>
        <Galery
          itemsArray={inventory.filter((item) => item.category === category)}
        />
      </div>
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
