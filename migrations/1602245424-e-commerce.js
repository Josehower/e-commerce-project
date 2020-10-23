const inventory = [
  {
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    name: 'Buso botón',
    category: 'busos',
    img: '/productos-liamty/buso-botón.jpg',
    img2: '/images-large/buso-botón-large.jpg',
  },
  {
    name: 'Buso clásico',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-clasico.jpg',
    img2: '/images-large/buso-clasico-large.jpg',
  },
  {
    name: 'Buso cuadros',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuadros.jpg',
    img2: '/images-large/buso-cuadros-large.jpg',
  },
  {
    name: 'Buso hombro',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-hombro.jpg',
    img2: '/images-large/buso-hombro-large.jpg',
  },
  {
    name: 'Buso maya',
    category: 'busos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-maya.jpg',
    img2: '/images-large/buso-maya-large.jpg',
  },
  {
    name: 'Buso trenza',
    category: 'busos',
    price: 55000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-trenza.jpg',
    img2: '/images-large/buso-trenza-large.jpg',
  },
  {
    name: 'Gabán botón',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-botón.jpg',
    img2: '/images-large/gabán-botón-large.jpg',
  },
  {
    name: 'Gabán combinado',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-combinado.jpg',
    img2: '/images-large/gabán-combinado-large.jpg',
  },
  {
    name: 'Vestido unicolor',
    category: 'vestidos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-unicolor.jpg',
    img2: '/images-large/vestido-unicolor-large.jpg',
  },
  {
    name: 'Gabán kimono',
    category: 'gabanes',
    price: 65000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/gabán-kimono.jpg',
    img2: '/images-large/gabán-kimono-large.jpg',
  },
  {
    name: 'Vestido botón',
    category: 'vestidos',
    price: 80000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-botón.jpg',
    img2: '/images-large/vestido-botón-large.jpg',
  },
  {
    name: 'Vestido raya',
    category: 'vestidos',
    price: 75000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-raya.jpg',
    img2: '/images-large/vestido-raya-large.jpg',
  },
  {
    name: 'Buso cuello caído',
    category: 'busos',
    price: 60000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuello-caído.jpg',
    img2: '/images-large/buso-cuello-caído-large.jpg',
  },
  {
    name: 'Buso cuello tortuga',
    category: 'busos',
    price: 50000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/buso-cuello-tortuga.jpg',
    img2: '/images-large/buso-cuello-tortuga-large.jpg',
  },
  {
    name: 'Vestido cuello caído',
    category: 'vestidos',
    price: 75000,
    sizeOptions: ['TALLA UNICA'],
    img: '/productos-liamty/vestido-cuello-caído.jpg',
    img2: '/images-large/vestido-cuello-caído-large.jpg',
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
	INSERT INTO product ${sql(
    inventory,
    'name',
    'category',
    'price',
    'img',
    'img2',
  )}`;

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
