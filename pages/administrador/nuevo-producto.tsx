import styled from "styled-components";
import Link from 'next/link'

const AdministratorHeader = styled.header`
display: flex;
justify-content: space-between;
`
const AdministratorNav = styled.nav`
display: flex;
align-items: center;
text-align: center;
`

const NuevoProducto = () => {
  return (<>
    <AdministratorHeader>
      <AdministratorNav>
        <Link href="/administrador/nuevo-producto">
        <a>Nuevo Producto</a>
        </Link>
        <Link href="/administrador/inventario">
        <a>Inventario</a>
        </Link>
      </AdministratorNav>
      <h1>panel de control</h1>
      <img src="a#" alt="icono Salir"/>
    </AdministratorHeader>
    <div>
     componente objeto
    </div>
    <div>
     <button>Crear Producto</button>
    </div>
    </>
  );
};

export default NuevoProducto;