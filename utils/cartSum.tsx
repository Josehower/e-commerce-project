import { ProductType } from './types';

export default function cartSum(cartItems: ProductType[]): number {
  return cartItems?.reduce((acc: number, { price, qty }: ProductType) => {
    const itemTotal = price * qty;
    return acc + itemTotal;
  }, 0);
}
