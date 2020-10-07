import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';

const CallMeBanner = styled.section`
  padding: 10px;
  text-align: center;
  line-height: 1.5rem;
  background: #98856c;
  color: #ffffff;
  margin-bottom: 8px;

  div {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    background: #4fce5d;
    border-radius: 5px;
    box-shadow: 2px 2px #555;
    width: 70vw;
    padding: 5px;

    a {
      font-size: 24px;
      text-decoration: none;
      color: #ffffff;
    }
    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  p {
    font-size: 12px;
  }
`;

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
  background: #fff7ed;
  padding: 10px;
  text-align: center;
  border-top: 2px solid #ccc;
  button {
    background: #d9b99b;
    color: #fff7ed;
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
    color: #777;
  }
`;

const informacion = () => {
  return (
    <div>
      <ProgressIndicator activeStep={1} />
      <CallMeBanner>
        También puedes hacer tu pedido por <br /> teléfono o WhatsApp:
        <div>
          <img src="/whatsAppLogo.svg" alt="" />
          <a href="tel:06603275006">todo 301-393-21-65</a>
        </div>
        <p>Lunes a viernes 9:00am a 5:00 pm</p>
      </CallMeBanner>
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
        <button>Siguiente</button>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default informacion;
