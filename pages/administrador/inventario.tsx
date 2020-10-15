import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { colors } from '../../components/Layout';

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

const Inventario = () => {
  const [products, setProducts] = useState([]);

  async function deleteUser(id: number) {
    const response = await fetch(`/api/productos/new`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    const data = await response.json();
    setProducts(products.filter((product) => product.id !== data[0].id));
  }

  useEffect(() => {
    async function getProducts() {
      const response = await fetch('/api/productos');

      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <>
      <AdministratorHeader>
        <AdministratorNav>
          <Div active={true}>
            <Link href="/administrador/nuevo-producto">
              <a>Nuevo Producto</a>
            </Link>
          </Div>
          <Div>
            <Link href="/administrador/inventario">
              <a>Inventario</a>
            </Link>
          </Div>
        </AdministratorNav>
        <h1>Panel de Control</h1>
        <img src="/logout.svg" alt="icono Salir" />
      </AdministratorHeader>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/tienda/${product.category}/${product.name}-${product.id}`}
            >
              <a> {product.name}</a>
            </Link>
            <button onClick={() => deleteUser(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Inventario;
