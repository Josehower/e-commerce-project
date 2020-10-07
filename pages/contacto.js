import styled from 'styled-components';

const Form = styled.form`
  height: calc(90vh - 76px);
  min-height: 400px;
  margin: 0 auto;
  display: grid;
  align-content: center;
  justify-items: center;

  h1 {
    text-align: center;
    background: #d9b99b;
    color: beige;
    text-shadow: 1px 1px #666;
    padding: 5px;
    border-radius: 5px;
    width: 90vw;
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
    background: #d9b99b;
    color: beige;
    text-shadow: 1px 1px #666;
    width: 50vw;
    font-size: 1.2em;
    padding: 5px;
    box-shadow: 2px 2px #666;
  }
`;

const Contacto = () => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <h1>Tienes preguntas?</h1>
      <br />
      <label>
        Asunto:
        <input type="text" />
      </label>
      <br /> <br />
      <textarea name="" id="" cols="30" rows="20"></textarea>
      <button>Enviar</button>
    </Form>
  );
};

export default Contacto;
