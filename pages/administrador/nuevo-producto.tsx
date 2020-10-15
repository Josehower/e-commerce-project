import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../../components/Layout';
import ProductAdmin from '../../components/ProductAdmin';
import { GetServerSideProps } from 'next';

type StyledProps = {
  active?: boolean;
};

type Props = {
  inventory: string[];
  categoryList: string[];
};

const AdministratorHeader = styled.header`
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  img {
    width: 30px;
    transform: rotate(180deg);
    margin-right: 5px;
  }
`;
const AdministratorNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Div = styled.div<StyledProps>`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.active ? colors.gray : colors.white)};

  a {
    text-decoration: none;
    color: ${colors.black};
  }
`;

const NuevoProducto = (props: Props) => {
  async function createProduct(FormInfo) {
    const response = await fetch(`/api/productos/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormInfo),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <AdministratorHeader>
        <AdministratorNav>
          <Div>
            <Link href="/administrador/nuevo-producto">
              <a>Nuevo Producto</a>
            </Link>
          </Div>
          <Div active={true}>
            <Link href="/administrador/inventario">
              <a>Inventario</a>
            </Link>
          </Div>
        </AdministratorNav>
        <h1>Panel de Control</h1>
        <img src="/logout.svg" alt="icono Salir" />
      </AdministratorHeader>
      <ProductAdmin
        categoryList={props.categoryList}
        getFormInfo={createProduct}
      />
    </>
  );
};

export default NuevoProducto;

export const getServerSideProps: GetServerSideProps = async () => {
  const { getInventory, getCategories } = await import('../../utils/dataBase');

  const inventory = await getInventory();
  const categoryList = await getCategories();

  return {
    props: {
      inventory,
      categoryList,
    },
  };
};
