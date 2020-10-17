import { useState, useEffect } from 'react';
import Product from '../../../components/Product';

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

    const nameIdToArray = props.nameId.split('-');

    setCurrentIndex(
      props.inventory
        .filter((item) => item.category === props.category)
        .map((item) => item.id)
        .findIndex(
          (itemId) =>
            itemId === parseInt(nameIdToArray[nameIdToArray.length - 1]),
        ),
    );
  }, [props.category, props.nameId, props.inventory]);

  if (!props.categoryList.includes(props.category)) {
    return <div>not a category</div>;
  }

  return (
    <>
      <Product
        productId={avaliableItems[currentIndex]}
        inventory={props.inventory}
        setCartAmount={props.setCartAmount}
      />
      <button onClick={backItem}>back</button>
      <button data-cy="product-button-next" onClick={nextItem}>
        next
      </button>
    </>
  );
};

export default StoreItem;

export async function getServerSideProps(context) {
  const { getInventory, getCategories } = await import(
    '../../../utils/dataBase'
  );

  const inventory = await getInventory();
  const categoryList = await getCategories();

  return {
    props: {
      category: context.query.category,
      nameId: context.query.nameId,
      inventory,
      categoryList,
    },
  };
}
