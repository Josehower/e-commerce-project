import { ProductType } from './types';

export const productsTestExample: ProductType[] = [
  {
    category: 'shoes',
    id: 1,
    img: '/pants/gray-shoes.jpg',
    name: 'gray shoes',
    price: 15000,
    qty: 1,
    size: '22',
    sizeOptions: ['22', '24', '25'],
  },
  {
    category: 'pants',
    id: 2,
    img: '/pants/blue-pants.jpg',
    name: 'blue pants',
    price: 19250,
    qty: 1,
    size: 'L',
    sizeOptions: ['XL', 'L', 'M', 'S'],
  },
  {
    category: 'pants',
    id: 3,
    img: '/pants/gray-pants.jpg',
    name: 'gray pants',
    price: 23000,
    qty: 7,
    size: 'S',
    sizeOptions: ['XL', 'L', 'M', 'S'],
  },
  {
    category: 'tops',
    id: 4,
    img: '/pants/gray-top.jpg',
    name: 'gray top',
    price: 67000,
    qty: 4,
    size: 'M',
    sizeOptions: ['M', 'S'],
  },
];
