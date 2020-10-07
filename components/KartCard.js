import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { useState } from 'react';

const Img = styled.img`
  width: 30vw;
`;

const Card = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: 5vw 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TextCard = styled.div`
  display: grid;
  gap: 0.5em;
`;

const KartCard = (props) => {
  const [kartItem, setKartItem] = useState(props.kartItem);

  function updateKartItem(keyName, newValue) {
    const updatedItem = { ...kartItem };
    updatedItem[keyName] = newValue;
    setKartItem(updatedItem);
    const updatedKart = props.updateArticle(updatedItem, props.kartItem.id);
    props.setKartItems(updatedKart);
  }

  function deleteKartItem() {
    const updatedKart = props.deleteItemFromKart(kartItem.id);
    props.setKartItems(updatedKart);
  }

  return (
    <Card>
      <Img src={kartItem.img} alt="blue-pants" />
      <TextCard>
        <h3>{kartItem.name}</h3>
        <label>
          Talla: &nbsp;
          <select
            id="cars"
            value={kartItem.size}
            onChange={(e) => updateKartItem('size', e.currentTarget.value)}
            onBlur={(e) => {
              return;
            }}
          >
            {kartItem.sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Cantidad: &nbsp;
          <input
            type="number"
            min={1}
            max={99}
            value={kartItem.qty}
            onChange={(e) =>
              updateKartItem('qty', parseInt(e.currentTarget.value, 10))
            }
          />
        </label>
        <div>
          $&nbsp;
          <NumberFormat
            value={kartItem.price * kartItem.qty}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
        <button onClick={deleteKartItem}>Remove</button>
      </TextCard>
    </Card>
  );
};

export default KartCard;
