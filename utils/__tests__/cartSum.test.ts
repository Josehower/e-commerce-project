import cartSum from '../cartSum';
import { productsTestExample } from '../exampleDataForTest';

test('Add the value of two items on the array', () => {
  const usersArray = [productsTestExample[0], productsTestExample[1]];

  const finalValue = cartSum(usersArray);

  expect(finalValue).toBe(34250);
});

test('Multiply the value for the quantity of the item', () => {
  const usersArray = [productsTestExample[3]];

  const finalValue = cartSum(usersArray);

  expect(finalValue).toBe(268000);
});

test('Multiply the value for the quantity of each item and then sums all the values', () => {
  const usersArray = productsTestExample;

  const finalValue = cartSum(usersArray);

  expect(finalValue).toBe(463250);
});
