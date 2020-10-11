import styled from 'styled-components';
import { colors } from './Layout';

const CallMeBanner = styled.section`
  padding: 10px;
  text-align: center;
  line-height: 1.5rem;
  background: ${colors.primaryWhite};
  color: ${colors.whitblacke};
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

const CallmeBanner = () => {
  return (
    <CallMeBanner>
      También puedes hacer tu pedido por <br /> teléfono o WhatsApp:
      <div>
        <img src="/whatsAppLogo.svg" alt="" />
        <a href="tel:3013932165">301-393-21-65</a>
      </div>
      <p>Lunes a viernes 9:00am a 5:00 pm</p>
    </CallMeBanner>
  );
};

export default CallmeBanner;
