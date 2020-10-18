import { useState, useEffect } from 'react';
import Product from '../../../components/Product';
import Galery from '../../../components/Galery';

const StoreItem = (props) => {
  const [itemIdToDisplay, setItemIdToDisplay] = useState();
  const galeryItems = props.inventory.filter(
    (item) => item.category === props.category,
  );

  useEffect(() => {
    const nameIdFromUrl = props.nameId.split('-')[
      props.nameId.split('-').length - 1
    ];
    const [itemToDisplay] = props.inventory.filter(
      (item) => item.id.toString() === nameIdFromUrl,
    );
    setItemIdToDisplay(itemToDisplay.id);
  }, [props.inventory, props.nameId]);

  if (!props.categoryList.includes(props.category)) {
    return <div>not a category</div>;
  }

  return (
    <>
      <Product
        productId={itemIdToDisplay}
        inventory={props.inventory}
        setCartAmount={props.setCartAmount}
      />
      <Galery itemsArray={galeryItems} />
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
