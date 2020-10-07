import styled from 'styled-components';

const StoryContainer = styled.div`
  height: calc(90vh - 76px);
  background-color: beige;
  padding-top: 50px;
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
    margin: 5px auto;
    text-align: center;
  }

  p {
    padding: 20px 5vw;
    margin: 10px;
  }
`;

export default function Story() {
  return (
    <StoryContainer>
      <ProfileImage />
      <Section>
        <h2>Hola, soy Marta</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          dolorum error ex dignissimos in officia tenetur non voluptas labore
          incidunt.
        </p>
        <br />
        <br />
      </Section>
    </StoryContainer>
  );
}
