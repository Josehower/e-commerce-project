const inventory = [
  {
    img: '/productos-liamty/buso-botón.jpg',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    name: 'Buso botón',
    category: 'busos',
  },
  {
    name: 'Buso clásico',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-clasico.jpg',
  },
  {
    name: 'Buso cuadros',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuadros.jpg',
  },
  {
    name: 'Buso hombro',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-hombro.jpg',
  },
  {
    name: 'Buso maya',
    category: 'busos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-maya.jpg',
  },
  {
    name: 'Buso trenza',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-trenza.jpg',
  },
  {
    name: 'Gabán botón',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-botón.jpg',
  },
  {
    name: 'Gabán combinado',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-combinado.jpg',
  },
  {
    name: 'Vestido unicolor',
    category: 'vestidos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-unicolor.jpg',
  },
  {
    name: 'Gabán kimono',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-kimono.jpg',
  },
  {
    name: 'Vestido botón',
    category: 'vestidos',
    price: 80000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-botón.jpg',
  },
  {
    name: 'Vestido raya',
    category: 'vestidos',
    price: 75000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-raya.jpg',
  },
  {
    name: 'Buso cuello caído',
    category: 'busos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuello-caído.jpg',
  },
  {
    name: 'Buso cuello tortuga',
    category: 'busos',
    price: 50000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuello-tortuga.jpg',
  },
  {
    name: 'Vestido cuello caído',
    category: 'vestidos',
    price: 75000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-cuello-caído.jpg',
  },
];

//formatthe size options into an array.
const sizeOptionsArray = [].concat(
  ...inventory.map((product) => product.sizeOptions),
);

//take the size options array, delete repeated info and format the data to pass it properly to sql library.

const sizeOptionsSet = [...new Set(sizeOptionsArray)].map((option) => {
  return { size_option_name: option };
});

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
  [...sizesOnDatabase].forEach((obj) => {
    sizeOptToDataBaseID[obj.size_option_name] = obj.id;
  });

  const productNameToDataBaseID = {};
  [...productNamesOnDatabase].forEach((obj) => {
    productNameToDataBaseID[obj.name] = obj.id;
  });

  const junctionTableData = inventory.map((obj) => [
    productNameToDataBaseID[obj.name],
    obj.sizeOptions.map((objSize) => sizeOptToDataBaseID[objSize]),
  ]);

  for (const data of junctionTableData) {
    for (const sizeId of data[1]) {
      await sql`
INSERT INTO product_sizes VALUES (${data[0]}, ${sizeId})`;
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
