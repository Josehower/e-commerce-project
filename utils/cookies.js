import cookies from 'js-cookie';

export function addItemToCart(newItem) {
  const currentCart = cookies.getJSON('cart') ? cookies.getJSON('cart') : [];

  const cookieItemInfo = {
    id: newItem.id,
    qty: newItem.qty,
    sizeId: newItem.sizeOptions.findIndex((option) => newItem.size === option),
  };

  const indexOfItemToSum = currentCart.findIndex(
    (item) => item.id === cookieItemInfo.id,
  );

  if (indexOfItemToSum !== -1) {
    currentCart[indexOfItemToSum].qty += cookieItemInfo.qty;
    currentCart[indexOfItemToSum].size = cookieItemInfo.size;
    cookies.set('cart', JSON.stringify([...currentCart]));
    return;
  }

  cookies.set('cart', JSON.stringify([...currentCart, cookieItemInfo]));
}

export function updateArticle(newItem, OldItemId, fullItems) {
  const itemIndexOnCookie = cookies
    .getJSON('cart')
    .findIndex((item) => item.id === OldItemId);

  const cartCopy = [...cookies.getJSON('cart')];

  const newCookieItem = {
    id: newItem.id,
    qty: newItem.qty,
    sizeId: newItem.sizeOptions.findIndex((option) => newItem.size === option),
  };

  cartCopy[itemIndexOnCookie] = newCookieItem;

  const newFullItem = {
    ...fullItems[itemIndexOnCookie],
    id: newItem.id,
    qty: newItem.qty,
    size: fullItems[itemIndexOnCookie].sizeOptions[newCookieItem.sizeId],
  };
  const fullItemsCopy = [...fullItems];

  fullItemsCopy[itemIndexOnCookie] = newFullItem;

  cookies.set('cart', cartCopy);

  return fullItemsCopy;
}

export function deleteItemFromCart(itemId, fullItems) {
  const updatedCookie = cookies
    .getJSON('cart')
    .filter((item) => item.id !== itemId);

  const updatedItems = fullItems.filter((item) => item.id !== itemId);

  cookies.set('cart', updatedCookie);
  return updatedItems;
}

export function getClientCookies() {
  return cookies.getJSON('cart');
}

export function deleteCartCookie() {
  cookies.remove('cart');
}

export function isObjectCookieNotWellFormated(object, sizeOptRef) {
  if (!Number.isInteger(object.qty)) {
    return true;
  }
  if (!(Number.isInteger(object.sizeId) && sizeOptRef > object.sizeId)) {
    return true;
  }
  if (!Number.isInteger(object.id)) {
    return true;
  }

  return false;
}
