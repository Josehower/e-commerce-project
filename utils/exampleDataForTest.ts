import { ProductType } from './types';

export const productsTestExample: ProductType[] = [
  {
    category: 'shoes',
    id: 1,
    img: '/pants/gray-shoes.jpg',
    img2:'/pants/gray-shoes.jpg',
    name: 'gray shoes',
    price: 15000,
    qty: 1,
    size: '22',
    sizeOptions: ['22', '24', '25'],
    color: '#f1f1e9',
    colorOptions: ['#f1f1e9', '#000000', '#e9591c', '#871d95'],
  },
  {
    category: 'pants',
    id: 2,
    img: '/pants/blue-pants.jpg',
    img2: '/pants/blue-pants.jpg',
    name: 'blue pants',
    price: 19250,
    qty: 1,
    size: 'L',
    sizeOptions: ['XL', 'L', 'M', 'S'],
    color: '#000000',
    colorOptions: ['#f1f1e9', '#000000', '#e9591c', '#871d95'],
  },
  {
    category: 'pants',
    id: 3,
    img: '/pants/gray-pants.jpg',
    img2: '/pants/gray-pants.jpg',
    name: 'gray pants',
    price: 23000,
    qty: 7,
    size: 'S',
    sizeOptions: ['XL', 'L', 'M', 'S'],
    color: '#000000',
    colorOptions: ['#f1f1e9', '#000000', '#e9591c', '#871d95'],
  },
  {
    category: 'tops',
    id: 4,
    img: '/pants/gray-top.jpg',
    img2: '/pants/gray-top.jpg',
    name: 'gray top',
    price: 67000,
    qty: 4,
    size: 'M',
    sizeOptions: ['M', 'S'],
    color: '#e9591c',
    colorOptions: ['#f1f1e9', '#000000', '#e9591c', '#871d95'],
  },
];
