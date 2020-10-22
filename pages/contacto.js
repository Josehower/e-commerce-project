import styled from 'styled-components';
import CallmeBanner from '../components/CallmeBanner';
import { colors } from '../components/Layout';

const Form = styled.form`
  height: calc(70vh - 76px);
  min-height: 400px;
  margin: 0 auto;
  display: grid;
  align-content: center;
  justify-items: center;
  background: ${colors.white};

  h1 {
    text-align: center;
    background: ${colors.secondary};
    color: ${colors.white};
    text-shadow: 1px 1px #666;
    padding: 5px;
    border-radius: 5px;
    width: 70vw;
    font-size: 1.3em;
  }

  label {
    display: flex;
    justify-content: space-around;
    width: 90vw;
    font-size: 1.3em;
  }

  input {
    border-radius: 5px;
  }

  textarea {
    border-radius: 5px;
    width: 90vw;
    height: 50vw;
    font-size: 1.3em;
  }
  button {
    margin-top: 20px;
    border-radius: 5px;
    border: transparent;
    background: ${colors.primary};
    color: ${colors.white};
    text-shadow: 1px 1px ${colors.black};
    width: 90vw;
    font-size: 1.5em;
    padding: 8px;
    box-shadow: 2px 2px ${colors.secondaryDark};
    font-family: 'Sansita Swashed', cursive;
    font-weight: bolder;

    &:hover,
    &:active {
      transform: scale(1.02);
      background: ${colors.primaryDark};
    }
    &:focus {
      background: ${colors.primaryDark};
    }
  }
`;

const Contacto = () => {
  return (
    <>
      <CallmeBanner text="Tu opinión es muy importante." />
      <Form onSubmit={(e) => e.preventDefault()}>
        <h1>¿ Tienes preguntas ?</h1>
        <br />
        <label>
          Asunto:
          <input type="text" />
        </label>
        <br /> <br />
        <textarea name="" id="" cols="30" rows="20" />
        <button>Enviar</button>
      </Form>
    </>
  );
};

export default Contacto;
