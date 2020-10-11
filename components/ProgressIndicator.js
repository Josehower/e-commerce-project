import styled from 'styled-components';
import { colors } from './Layout';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProgressBox = styled.div`
  background: ${(props) => (props.active ? colors.white : '#5662B1')};
  color: ${(props) => (props.active ? colors.black : '#B6BDED')};
  border-left: solid 1px white;
  text-align: center;
  padding: 10px 0;
`;

const ProgressIndicator = (props) => {
  return (
    <Container>
      <ProgressBox active={props.activeStep === 1}>Información</ProgressBox>
      <ProgressBox active={props.activeStep === 2}>Forma de Pago</ProgressBox>
      <ProgressBox active={props.activeStep === 3}>Resumen</ProgressBox>
    </Container>
  );
};

export default ProgressIndicator;
