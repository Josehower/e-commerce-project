const inventory = [
  {
    img: '/pants/blue-pants.jpg',
    price: 20000,
    sizeOptions: ['L', 'M'],
    name: 'blue pants',
    category: 'pants',
  },
  {
    img: '/pants/gray-pants.jpg',
    price: 10000,
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'gray pants',
    category: 'pants',
  },
  {
    img: '/tops/lether-top.jpg',
    price: 30000,
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'black top',
    category: 'tops',
  },
  {
    img: '/shoes/pink-shoes.jpg',
    price: 15000,
    sizeOptions: ['28', '26', '24', '22'],
    name: 'pink shoes',
    category: 'shoes',
  },
  {
    img: '/shoes/sprint-shoes.jpg',
    price: 40000,
    sizeOptions: ['28', '26', '24', '22'],
    name: 'flower shoes',
    category: 'shoes',
  },
  {
    img: '/tops/white-top.jpg',
    price: 30000,
    sizeOptions: ['XL', 'L', 'M', 'S'],
    name: 'camiseta blanca',
    category: 'tops',
  },
  {
    img:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: 60000,
    sizeOptions: ['28', '26', '24', '22'],
    name: 'zapatos azules',
    category: 'shoes',
  },
  {
    img:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: 50000,
    sizeOptions: ['28', '26', '24', '22'],
    name: 'zapatetes azules',
    category: 'shoes',
  },
];
//formatthe size options into an array.
const sizeOptionsArray= [].concat(...inventory.map(product=>product.sizeOptions))

//take the size options array, delete repeated info and format the data to pass it properly to sql library.

const sizeOptionsSet= [...new Set(sizeOptionsArray)].map(option=>{return{"size_option_name":option}})


exports.up = async (sql) => {
  await sql`
	INSERT INTO product ${sql(inventory, 'name', 'category', 'price', 'img')}`;

await sql`
	INSERT INTO size_options ${sql(sizeOptionsSet, 'size_option_name')}`;

const sizesOnDatabase = await sql`
SELECT * FROM size_options`;

const productNamesOnDatabase = await sql`
SELECT id,name FROM product`;

const sizeOptToDataBaseID = {};
[...sizesOnDatabase].forEach(obj=>{sizeOptToDataBaseID[obj.size_option_name]=obj.id});

const productNameToDataBaseID = {};
[...productNamesOnDatabase ].forEach(obj=>{productNameToDataBaseID[obj.name]=obj.id});

const junctionTableData = inventory.map(
  obj=>[productNameToDataBaseID[obj.name],
  obj.sizeOptions.map(
    objSize=>sizeOptToDataBaseID[objSize]
    )]
);


for (const data of junctionTableData){
  for (const sizeId of data[1]){
    await sql`
INSERT INTO product_sizes VALUES (${data[0]}, ${sizeId})`

  }
}
};

exports.down = async (sql) => {
  // await sql`DELETE FROM product;`;
  for (const item of inventory) {
    await sql`
    DELETE FROM product_sizes;
  `;
    await sql`
      DELETE FROM product WHERE
        name = ${item.name} AND
        img = ${item.img};
		`;
    await sql`
      DELETE FROM size_options;
		`;

  }
};
