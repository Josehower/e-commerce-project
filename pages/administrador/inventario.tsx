import styled from "styled-components";
import Link from 'next/link'

const AdministratorHeader = styled.header`
display: flex;
justify-content: space-between;
`
const AdministratorNav = styled.nav`

`

const NuevoProducto = () => {
  return (<>
    <AdministratorHeader>
      <div>

        <Link href="/administrador/nuevo-producto">
        <a>Link 1</a>
        </Link>
        <Link href="/administrador/inventario">
        <a>Link 2</a>
        </Link>
      </div>
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