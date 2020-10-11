import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import CallmeBanner from '../../components/CallmeBanner';
import Link from 'next/link';

const Form = styled.form`
  display: grid;
  margin: 10px auto;
  width: 90vw;
  min-height: 50vw;

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 90vw;
  }
`;

const NextButton = styled.div`
  background: ${colors.secondary};
  padding: 10px;
  text-align: center;
  border-top: 2px solid #ccc;
  button {
    background: ${colors.primary};
    color: ${colors.white};
    font-size: 24px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px #555;
    padding: 5px;
    width: 80vw;
    text-shadow: 1px 1px #666;
  }

  p {
    margin: 8px;
    color: ${colors.white};
  }
`;

const Informacion = () => {
  return (
    <div>
      <ProgressIndicator activeStep={1} />
      <CallmeBanner />
      <Form action="">
        <h2>Información de envío</h2>
        <label htmlFor="">
          Nombre: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          Apellido: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          Ciudad: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          Barrio: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          Dirección: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          Teléfono: <br />
          <input type="text" />
        </label>
        <label htmlFor="">
          E-mail:{'  '}
          <input type="text" />
        </label>
      </Form>
      <NextButton>
        <Link href={'/pago/forma-de-pago'}>
          <button>Siguiente</button>
        </Link>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default Informacion;
