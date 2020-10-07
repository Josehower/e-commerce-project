import { useState, useEffect } from 'react';
import Product from '../../components/Product';
import inventory, { categoryList } from '../../utils/dataBase';

const StoreItem = (props) => {
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
    setAvaliableItems(
      inventory
        .filter((item) => item.category === props.category)
        .map((item) => item.id),
    );
    setCurrentIndex(0);
  }, [props.category]);

  if (!categoryList.includes(props.category)) {
    return <div>not a category</div>;
  }

  return (
    <>
      <Product productId={avaliableItems[currentIndex]} />
      <button onClick={backItem}>back</button>
      <button onClick={nextItem}>next</button>
    </>
  );
};

export default StoreItem;

export function getServerSideProps(context) {
  // context = {
  //   query: { id: '1' },
  //   params: { id: '1' },
  // }
  return {
    props: { category: context.query.category },
  };
}
