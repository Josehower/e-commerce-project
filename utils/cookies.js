import cookies from 'js-cookie';

export function addItemToKart(newItem) {
  const currentKart = cookies.getJSON('kart') ? cookies.getJSON('kart') : [];

  const indexOfItemToSum = currentKart.findIndex(
    (item) => item.id === newItem.id,
  );

  if (indexOfItemToSum !== -1) {
    currentKart[indexOfItemToSum].qty += newItem.qty;
    cookies.set('kart', JSON.stringify([...currentKart]));
    return;
  }

  cookies.set('kart', JSON.stringify([...currentKart, newItem]));
}

export function updateArticle(newItem, OldItemId) {
  const itemIndexOnCookie = cookies
    .getJSON('kart')
    .findIndex((item) => item.id === OldItemId);
  const kartCopy = [...cookies.getJSON('kart')];
  kartCopy[itemIndexOnCookie] = newItem;
  cookies.set('kart', kartCopy);
  return cookies.getJSON('kart');
}

export function deleteItemFromKart(itemId) {
  const updatedCookie = cookies
    .getJSON('kart')
    .filter((item) => item.id !== itemId);

  cookies.set('kart', updatedCookie);
  return cookies.getJSON('kart');
}

export function getClientCookies() {
  return cookies.getJSON('kart');
}

export function deleteKartCookie() {
  cookies.remove('kart');
}
