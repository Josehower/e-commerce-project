import { useState, useEffect } from 'react';
import Product from '../../components/Product';

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
      props.inventory
        .filter((item) => item.category === props.category)
        .map((item) => item.id),
    );
    setCurrentIndex(0);
  }, [props.category, props.inventory]);

  if (!props.categoryList.includes(props.category)) {
    return <div>not a category</div>;
  }

  return (
    <>
      <Product
      productId={avaliableItems[currentIndex]}
      inventory={props.inventory}
       />
      <button onClick={backItem}>back</button>
      <button onClick={nextItem}>next</button>
    </>
  );
};

export default StoreItem;

export async function getServerSideProps(context) {

  const {getInventory, getCategories} = await import('../../utils/dataBase');

  const inventory = await getInventory();
  const categoryList = await getCategories();

  return {
    props: { category: context.query.category,
      categoryList, inventory },
  };
}
