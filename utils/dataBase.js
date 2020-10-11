// import postgres from 'postgres';
// import dotenv from 'dotenv';
// import camelcaseKeys from 'camelcase-keys';

// dotenv.config();

// const sql = postgres();

// async function testMyWay(){
// const test = await sql`
// SELECT * FROM product;
// `;

// console.log(test)
// }
// testMyWay();

export const categoryList = ['pants', 'tops', 'shoes'];

const inventory = [
  {
    id: 1,
    img: '/pants/blue-pants.jpg',
    price: 20000,
    qty: 1,
    size: 'M',
    sizeOptions: ['L', 'M'],
    name: 'blue pants',
    category: 'pants',
  },
  {
    qty: 1,
    size: 'M',
    id: 2,
    img: '/pants/gray-pants.jpg',
    price: 10000,
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'gray pants',
    category: 'pants',
  },
  {
    id: 3,
    img: '/tops/lether-top.jpg',
    price: 30000,
    qty: 1,
    size: 'M',
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'black top',
    category: 'tops',
  },
  {
    id: 4,
    img: '/shoes/pink-shoes.jpg',
    price: 15000,
    qty: 1,
    size: '26',
    sizeOptions: ['28', '26', '24', '22'],
    name: 'pink shoes',
    category: 'shoes',
  },
  {
    id: 5,
    img: '/shoes/sprint-shoes.jpg',
    price: 40000,
    qty: 1,
    size: '26',
    sizeOptions: ['28', '26', '24', '22'],
    name: 'flower shoes',
    category: 'shoes',
  },
  {
    id: 6,
    img: '/tops/white-top.jpg',
    price: 30000,
    qty: 1,
    size: 'M',
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'camiseta blanca',
    category: 'tops',
  },
  {
    id: 7,
    img:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: 60000,
    qty: 1,
    size: '26',
    sizeOptions: ['28', '26', '24', '22'],
    name: 'zapatos azules',
    category: 'shoes',
  },
  {
    id: 8,
    img:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: 60000,
    qty: 1,
    size: '26',
    sizeOptions: ['28', '26', '24', '22'],
    name: 'zapatos azules',
    category: 'shoes',
  },
];

export default inventory;
