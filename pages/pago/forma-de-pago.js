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

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 90vw;
  }
  button {
    margin-top: 10px;
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

const RadialLabel = styled.label`
  width: 90vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  padding: 5px;
  margin: 10px 0;
  span {
    text-align: right;
  }
  input {
    width: 10px;
  }
`;

const Hr = styled.hr`
  border-top: 3px solid ${colors.gray};
`;

const AcordeonBody = styled.div`
  background: ${colors.gray};
  display: grid;
  padding: 8px 0;
  justify-content: center;
  margin-bottom: 20px;
  input {
    width: 86vw;
  }
  max-height: ${(props) => (props.isAccordionClosed ? '0px' : '100px')};
  ${(props) => (props.isAccordionClosed ? ' padding: 0;' : '')}
  transition: all .3s;
  overflow: hidden;
`;

const FormaDePago = () => {
  const [isAccordionBankClosed, setIsAccordionBankClosed] = useState(true);
  const [isAccordionNequiClosed, setIsAccordionNequiClosed] = useState(true);

  return (
    <div>
      <ProgressIndicator activeStep={2} />
      <CallmeBanner />
      <Form onSubmit={(e) => e.preventDefault()}>
        <h2>Metodo de envío</h2>
        <RadialLabel>
          <div> Envío rápido</div>
          <span>$ 5.000</span>
          <input type="radio" id="Rapido" name="envio" value="male" />
        </RadialLabel>
        <RadialLabel>
          <div>Envío normal</div>
          <span>gratis</span>
          <input type="radio" id="Normal" name="envio" value="female" />
        </RadialLabel>
        <Hr />
        <h2>¿Cómo prefieres pagar?</h2>

        <button
          onClick={(e) => setIsAccordionBankClosed(!isAccordionBankClosed)}
        >
          Directo a cuenta Bancaria
        </button>
        <AcordeonBody isAccordionClosed={isAccordionBankClosed}>
          <label>
            Nombre: <br />
            <input type="text" />
          </label>
        </AcordeonBody>

        <button
          onClick={(e) => setIsAccordionNequiClosed(!isAccordionNequiClosed)}
        >
          Nequi
        </button>
        <AcordeonBody isAccordionClosed={isAccordionNequiClosed}>
          <label>
            Nequi Pagos: <br />
            <input type="text" />
          </label>
        </AcordeonBody>
      </Form>
      <NextButton>
        <Link href={'/pago/resumen'}>
          <button>Siguiente</button>
        </Link>
        <p>Sólo Hacemos envíos a Colombia</p>
      </NextButton>
    </div>
  );
};

export default FormaDePago;
