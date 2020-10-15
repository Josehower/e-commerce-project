import { ProductType } from './types';

export default function cartSum(kartItems: ProductType[]): number {
  console.log(kartItems);
  return kartItems?.reduce((acc: number, { price, qty }: ProductType) => {
    const itemTotal = price * qty;
    return acc + itemTotal;
  }, 0);
}
