import { useState, useEffect } from 'react';
import Product from '../../components/Product';
import inventory from '../../utils/dataBase';

const StoreItem = () => {
  const [avaliableItems, setAvaliableItems] = useState([]);

  const [currentIndex, setCurrentIndex] = useState();

  function nextItem() {
    const newIndex =
      currentIndex === avaliableItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }
  function backItem() {
    const newIndex =
      currentIndex === 0 ? avaliableItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  useEffect(() => {
    setAvaliableItems(inventory.map((item) => item.id));
    setCurrentIndex(0);
  }, []);

  return (
    <>
      <Product productId={avaliableItems[currentIndex]} />
      <button onClick={backItem}>back</button>
      <button onClick={nextItem}>next</button>
    </>
  );
};

export default StoreItem;
