import { addItemToCart, deleteItemFromCart } from '../cookies';
import { ProductType } from '../types';
import { productsTestExample } from '../exampleDataForTest';
import cookies from 'js-cookie';

test('Add the cookie cartItem to Cookie', () => {
  const productToAdd: ProductType = productsTestExample[0];

  addItemToCart(productToAdd);

  expect(cookies.getJSON('cart')).toStrictEqual([{ id: 1, qty: 1, sizeId: 0, colorId: 0 }]);
});

test('remove the cookie cartItem to Cookie', () => {
  const productIdToremove: number = productsTestExample[0].id;

  deleteItemFromCart(productIdToremove, productsTestExample);

  expect(cookies.getJSON('cart')).toStrictEqual([]);
});

test('Add an existing item to the cookie and sum the qty value', () => {
  const productToAdd: ProductType = productsTestExample[0];

  addItemToCart(productToAdd);

  expect(cookies.getJSON('cart')).toStrictEqual([{ id: 1, qty: 1, sizeId: 0, colorId: 0, }]);

  addItemToCart(productToAdd);

  expect(cookies.getJSON('cart')).toStrictEqual([{ id: 1, qty: 2, sizeId: 0, colorId: 0, }]);
});
