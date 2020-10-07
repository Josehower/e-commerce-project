import styled from 'styled-components';
import Galery from '../../components/Galery';
import inventory, { categoryList } from '../../utils/dataBase';

const H1 = styled.h1`
  margin: 5px 0;
`;

const tienda = () => {
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
};

export default tienda;
