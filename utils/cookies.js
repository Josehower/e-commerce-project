import cookies from 'js-cookie';

export function addItemToCart(newItem) {
  const currentCart = cookies.getJSON('cart') ? cookies.getJSON('cart') : [];

  const cookieItemInfo = {
    id: newItem.id,
    qty: newItem.qty,
    sizeId: newItem.sizeOptions.findIndex((option) => newItem.size === option),
  };

  console.log('new testitem cookie-8', cookieItemInfo, currentCart);

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

export function updateArticle(newItem, OldItemId) {
  const itemIndexOnCookie = cookies
    .getJSON('cart')
    .findIndex((item) => item.id === OldItemId);
  const cartCopy = [...cookies.getJSON('cart')];
  console.log('update article', cookies.getJSON('cart'));
  console.log('old item', cartCopy);
  console.log('newItem', newItem);

  cartCopy[itemIndexOnCookie] = {
    id: newItem.id,
    qty: newItem.qty,
    sizeId: newItem.sizeOptions.findIndex((option) => newItem.size === option),
  };

  cookies.set('cart', cartCopy);
  return cookies.getJSON('cart');
}

export function deleteItemFromCart(itemId) {
  const updatedCookie = cookies
    .getJSON('cart')
    .filter((item) => item.id !== itemId);

  cookies.set('cart', updatedCookie);
  return cookies.getJSON('cart');
}

export function getClientCookies() {
  return cookies.getJSON('cart');
}

export function deleteCartCookie() {
  console.log('delete!!!');
  cookies.remove('cart');
}

export function isObjectCookieNotWellFormated(object, sizeOptRef) {
  if (!Number.isInteger(object.qty)) {
    console.log('false qty');
    return true;
  }
  console.log(sizeOptRef, object.sizeId);
  if (!(Number.isInteger(object.sizeId) && sizeOptRef > object.sizeId)) {
    console.log('false sizeId');
    return true;
  }
  if (!Number.isInteger(object.id)) {
    console.log('false id');
    return true;
  }

  return false;
}
