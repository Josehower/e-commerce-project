import styled from 'styled-components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { colors } from '../../components/Layout';
import CallmeBanner from '../../components/CallmeBanner';
import { useState } from 'react';
import Link from 'next/link';

const Form = styled.form`
  display: grid;
  margin: 10px auto;
  width: 90vw;
  min-height: 50vw;

  span {
    font-weight: bold;
    color: ${colors.secondaryDark};
  }

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 90vw;
  }
  button {
    background: ${colors.secondary};
    padding: 10px;
    text-align: center;
    border-top: 2px solid #ccc;
    margin-bottom: 0;
    color: ${colors.white};
    border: solid 1px transparent;
    border-radius: 3px;
  }
  button:focus {
    outline: none;
    background: ${colors.secondaryDark};
  }
`;

const StyledLink = styled.div`
  a {
    text-decoration: none;
    display: block;
    background: ${colors.secondary};
    padding: 10px;
    text-align: center;
    border-top: 2px solid #ccc;
    margin-bottom: 5vh;
    color: ${colors.white};
    border: solid 1px transparent;
    width: 90vw;
    border-radius: 3px;
  }
  a:focus,
  a:active {
    outline: none;
    background: ${colors.secondaryDark};
  }
`;

const NextButton = styled.div`
  background: ${colors.secondaryDark};
  padding: 10px;
  text-align: center;
  border-top: 2px solid #ccc;
  margin-bottom: 0;

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
    margin-bottom: 0;
    color: ${colors.white};
  }
`;

const AcordeonBody = styled.div`
  background: ${colors.primaryWhite};
  display: grid;
  padding: 8px 0;
  justify-content: center;
  margin-bottom: 20px;
  max-height: ${(props) => (props.isAccordionClosed ? '0px' : '270px')};
  ${(props) => (props.isAccordionClosed ? ' padding: 0;' : '')}
  transition: all .3s;
  overflow: hidden;

  span {
    color: ${colors.black};
    text-align: center;
  }

  & > p {
    padding: 8px;
    text-align: justify;
  }

  h2 {
    text-align: center;
    color: ${colors.secondaryDark};
    font-weight: bold;
  }
`;

const FormaDePago = () => {
  const [isAccordionBankClosed, setIsAccordionBankClosed] = useState(true);

  return (
    <div>
      <ProgressIndicator activeStep={2} />
      <CallmeBanner />
      <Form onSubmit={(e) => e.preventDefault()}>
        <br /> <br />
        <h2>¿Cómo prefieres pagar?</h2>
        <p>
          Te hacemos la vida mas facil ofreciendote varias opciones de pago:
        </p>
        <br />
        <br />
        <button
          data-cy="acordeon-direct-to-bank-account"
          onClick={(e) => setIsAccordionBankClosed(!isAccordionBankClosed)}
        >
          Directo a cuenta Bancaria
        </button>
        <AcordeonBody isAccordionClosed={isAccordionBankClosed}>
          <p>
            Luego de que hagas la transferencia, envíanos una foto o el
            pantallazo con la confirmación de envio, en el asunto de la
            transferencia debes usar el siguiente <strong>codigo:</strong>
          </p>
          <br />
          <h2>YX23XMXS1</h2>
          <span>
            Numero de cuenta Bancolombia: <br /> <br />
          </span>
          <h2>12312334</h2>
          <NextButton>
            <Link href={'/pago/resumen'}>
              <button data-cy="button-next-inside-accordeon">Siguiente</button>
            </Link>
            <p>Sólo Hacemos envíos a Colombia</p>
          </NextButton>
        </AcordeonBody>
        <br /> <br />
        <StyledLink>
          <Link href="/nequi-pagos">
            <a data-cy="link-nequi-payment-method">Nequi pagos</a>
          </Link>
        </StyledLink>
        <p>
          <br />
          si aun tienes dudas puedes llamarnos en nuestros horarios de atención
          o escribirnos a WhatsApp directamente <span>tel. 301-393-21-65</span>
          <br />
          <br />
        </p>
      </Form>
    </div>
  );
};

export default FormaDePago;
