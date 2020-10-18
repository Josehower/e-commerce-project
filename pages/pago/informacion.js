import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import CallmeBanner from '../../components/CallmeBanner';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

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

const Alert = styled.div`
  background: red;
  color: white;
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
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(e) {
    alert(JSON.stringify(e));
    router.push('/pago/forma-de-pago');
  }
  return (
    <div>
      <ProgressIndicator activeStep={1} />
      <CallmeBanner />
      <Form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Información de envío</h2>
        <label>
          Nombre: <br />
          <input name="name" ref={register({ required: true })} type="text" />
          {errors.name && <Alert>Nombre es Requerido</Alert>}
        </label>
        <label>
          Apellido: <br />
          <input
            ref={register({ required: true })}
            name="apellido"
            type="text"
          />
          {errors.apellido && <Alert>Apellido es Requerido</Alert>}
        </label>
        <label>
          Ciudad: <br />
          <input ref={register} name="Ciudad" type="text" />
        </label>
        <label>
          Barrio: <br />
          <input ref={register} name="Barrio" type="text" />
        </label>
        <label>
          Dirección: <br />
          <input ref={register} name="Dirección" type="text" />
        </label>
        <label>
          Teléfono: <br />
          <input ref={register} name="Teléfono" type="text" />
        </label>
        <label>
          E-mail:{'  '}
          <input ref={register} name="E-mail" type="text" />
        </label>
      </Form>
      <NextButton>
        <button form="my-form" type="submit">
          Siguiente
        </button>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default Informacion;
