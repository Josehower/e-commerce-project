import styled from 'styled-components';
import { colors } from './Layout';

const StoryContainer = styled.div`
  min-height: calc(80vh - 76px);
  background-color: ${colors.white};
  padding-top: 20px;
`;

const ProfileImage = styled.div`
  background: url(/profile.jpg) 50% 50% no-repeat; /* 50% 50% centers image in div */
  background-size: cover;
  width: 90vw;
  height: 90vw;
  max-width: 300px;
  max-height: 300px;
  border-radius: 50%;
  margin: 0 auto;
`;

const Section = styled.section`
  h2 {
    margin: 20px auto;
    text-align: center;
    color: ${colors.secondaryDark};
  }

  p {
    padding: 20px 5vw;
    margin: 10px;
    background-color: ${colors.secondary};
    color: ${colors.white};
    font-size: 1.2em;
    border-radius: 3px;
  }
`;

export default function Story() {
  return (
    <StoryContainer>
      <ProfileImage />
      <Section>
        <h2>Hola, soy Marta</h2>
        <p>
          Soy una orgullosa madre que cree que las mujeres podemos emprender sin
          dejar de lado nuestra belleza y estilo.
          <br /> <br />
          Quiero compartir contigo mi amor por la moda con prendas cómodas
          seleccionadas para una mujer activa y moderna.
        </p>
        <br />
        <br />
      </Section>
    </StoryContainer>
  );
}
