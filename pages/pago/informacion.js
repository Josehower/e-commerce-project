import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import CallmeBanner from '../../components/CallmeBanner';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

/*eslint-disable */
const eMailRegex = new RegExp(
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
);
/*eslint-enable */

const BodyMask = styled.div`
  background: ${colors.white};
`;

const Form = styled.form`
  display: grid;
  margin: 0 auto 10px;
  width: 90vw;
  min-height: 50vw;
  padding-bottom: 3vw;
  margin-bottom: 0;

  h2 {
    padding-top: 5px;
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  function onSubmit(data) {
    localStorage.setItem('user-checkout-info', JSON.stringify(data));
    router.push('/pago/forma-de-pago');
  }
  useEffect(() => {
    const storageInfo = JSON.parse(localStorage.getItem('user-checkout-info'));
    setFirstName(storageInfo?.name ? storageInfo.name : '');
    setLastName(storageInfo?.lastName ? storageInfo.lastName : '');
    setCity(storageInfo?.city ? storageInfo.city : '');
    setDistrict(storageInfo?.district ? storageInfo.district : '');
    setAddress(storageInfo?.address ? storageInfo.address : '');
    setPhone(storageInfo?.phone ? storageInfo.phone : '');
    setEmail(storageInfo?.email ? storageInfo.email : '');
  }, []);
  return (
    <div>
      <ProgressIndicator activeStep={1} />
      <CallmeBanner text="También puedes hacer tu pedido por" />
      <BodyMask>
        <Form id="my-form" onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(errors).length !== 0 && (
            <Alert>ups! algo salio mal</Alert>
          )}
          <h2>Información de envío</h2>
          <label>
            Nombre: <br />
            <input
              data-cy="input-address-info-form-field-name"
              name="name"
              onChange={(e) => setFirstName(e.target.value)}
              ref={register({ required: true })}
              type="text"
              value={firstName}
            />
            {errors.name && <Alert>Nombre es Requerido</Alert>}
          </label>
          <label>
            Apellido: <br />
            <input
              data-cy="input-address-info-form-field-lastName"
              name="lastName"
              value={lastName}
              ref={register({ required: true })}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <Alert>Apellido es Requerido</Alert>}
          </label>
          <label>
            Ciudad: <br />
            <input
              data-cy="input-address-info-form-field-city"
              name="city"
              ref={register({ required: true })}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <Alert>Ciudad es Requerido</Alert>}
          </label>
          <label>
            Barrio: <br />
            <input
              data-cy="input-address-info-form-field-district"
              name="district"
              value={district}
              ref={register({ required: true })}
              type="text"
              onChange={(e) => setDistrict(e.target.value)}
            />
            {errors.district && <Alert>Barrio es Requerido</Alert>}
          </label>
          <label>
            Dirección: <br />
            <input
              data-cy="input-address-info-form-field-address"
              name="address"
              value={address}
              ref={register({ required: true })}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <Alert>Dirección es Requerido</Alert>}
          </label>
          <label>
            Teléfono: <br />
            <input
              data-cy="input-address-info-form-field-phone"
              name="phone"
              value={phone}
              ref={register({ required: true })}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <Alert>Teléfono es Requerido</Alert>}
          </label>
          <label>
            E-mail:
            <input
              data-cy="input-address-info-form-field-email"
              name="email"
              value={email}
              ref={register({ required: true, pattern: eMailRegex })}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && errors.email.type === 'required' && (
              <Alert>E-mail es Requerido</Alert>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <Alert>ups! esto no es un e-mail valido</Alert>
            )}
          </label>
        </Form>
      </BodyMask>
      <NextButton>
        <button
          data-cy="info-form-field-next-button"
          form="my-form"
          type="submit"
        >
          Siguiente
        </button>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default Informacion;
