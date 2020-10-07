import styled from 'styled-components';
import { useState } from 'react';

const images = [
  '/pants/blue-pants.jpg',
  '/pants/gray-pants.jpg',
  '/pants/purple-pants.jpg',
];

const SliderImage = styled.img`
  width: 100vw;
  grid-column: 1;
  grid-row: 1;
  z-index: ${(props) => props.display};
`;

const SliderContainer = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    z-index: 10;
    left: 50vw;
    bottom: 10px;
  }
`;

export default function Slider({ className }) {
  const [currentImage, setCurrentImage] = useState(0);

  function changeImage() {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }
  return (
    <SliderContainer className={className}>
      {images.map((image, index) => (
        <SliderImage
          display={index === currentImage ? '2' : '-1'}
          key={image}
          src={image}
          alt=""
        />
      ))}
      <button onClick={() => changeImage()}>next</button>
    </SliderContainer>
  );
}
