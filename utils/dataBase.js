import postgres from 'postgres';
import dotenv from 'dotenv';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenv.config();
const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

// const sql = postgres();

//Return a full inventory array of objects whit all the objects on inventory
export async function getInventory() {
  const products = await sql`
      SELECT * FROM product;
    `;

  const sizeOptions = await sql`
    SELECT product.id, size_options.size_option_name
      FROM product
      JOIN product_sizes
        ON product.id = product_sizes.product_id
      JOIN size_options
        ON size_options.id = product_sizes.size_id;
    `;
  const colorOptions = await sql`
    SELECT product.id, color_options.color_option_name
      FROM product
      JOIN product_colors
        ON product.id = product_colors.product_id
      JOIN color_options
        ON color_options.id = product_colors.color_id;
    `;

  const sizeOptionsCamel = sizeOptions.map((obj) => {
    return {
      id: obj.id,
      sizeOptionName: obj.size_option_name,
    };
  });

  const colorOptionsCamel = colorOptions.map((obj) => {
    return {
      id: obj.id,
      colorOptionName: obj.color_option_name,
    };
  });

  const sizeOptionsReduced = sizeOptionsCamel.reduce((acc, productOptions) => {
    acc[productOptions.id]
      ? (acc[productOptions.id] = [
          ...acc[productOptions.id],
          productOptions.sizeOptionName,
        ])
      : (acc[productOptions.id] = [productOptions.sizeOptionName]);

    return acc;
  }, {});

  const colorOptionsReduced = colorOptionsCamel.reduce(
    (acc, productOptions) => {
      acc[productOptions.id]
        ? (acc[productOptions.id] = [
            ...acc[productOptions.id],
            productOptions.colorOptionName,
          ])
        : (acc[productOptions.id] = [productOptions.colorOptionName]);

      return acc;
    },
    {},
  );

  return products.map((product) => {
    return {
      ...product,
      sizeOptions: sizeOptionsReduced[product.id],
      qty: 1,
      size: sizeOptionsReduced[product.id][0],
      colorOptions: colorOptionsReduced[product.id],
      color: colorOptionsReduced[product.id][0],
    };
  });
}

export async function getCategories() {
  const categoriesObject = await sql`
  SELECT category FROM product;
`;

  const categoyList = [...new Set(categoriesObject.map((obj) => obj.category))];

  return categoyList;
}

export async function createNewProduct(newProduct) {
  const product = await sql`
  INSERT INTO product ${sql(
    newProduct,
    'name',
    'category',
    'price',
    'img',
    'img2',
  )}
  RETURNING * ;`;

  const sizesIdFromDb = await sql`
  SELECT size_option_name FROM size_options;`;

  const colorsIdFromDb = await sql`
  SELECT color_option_name FROM color_options;`;

  const sizeOptionsObj = newProduct.sizeOptions.map((opt) => {
    return { size_option_name: opt };
  });

  const colorOptionsObj = newProduct.colorOptions.map((opt) => {
    return { color_option_name: opt };
  });

  const sizesReduced = sizesIdFromDb.reduce((acc, obj) => {
    if (
      acc.map((item) => item.size_option_name).includes(obj.size_option_name)
    ) {
      return acc.filter(
        (item) => item.size_option_name !== obj.size_option_name,
      );
    }
    return acc;
  }, sizeOptionsObj);

  const colorsReduced = colorsIdFromDb.reduce((acc, obj) => {
    if (
      acc.map((item) => item.color_option_name).includes(obj.color_option_name)
    ) {
      return acc.filter(
        (item) => item.color_option_name !== obj.color_option_name,
      );
    }
    return acc;
  }, colorOptionsObj);

  if (sizesReduced.length !== 0) {
    await sql`
  INSERT INTO size_options ${sql(sizesReduced, 'size_option_name')}`;
  }

  if (colorsReduced.length !== 0) {
    await sql`
  INSERT INTO color_options ${sql(colorsReduced, 'color_option_name')}`;
  }

  for (const size of newProduct.sizeOptions) {
    await sql`
    INSERT INTO product_sizes VALUES (${product[0].id}, (SELECT id FROM size_options WHERE size_option_name = ${size}));`;
  }

  for (const color of newProduct.colorOptions) {
    await sql`
    INSERT INTO product_colors VALUES (${product[0].id}, (SELECT id FROM color_options WHERE color_option_name = ${color}));`;
  }

  return;
}

export async function deleteProductById(productId) {
  // remove product that cascade to the junction table.
  const allProducts = await sql`
  DELETE FROM product WHERE id = ${productId}RETURNING * ;`;

  // purge non used sizes.
  await sql`
  DELETE FROM size_options WHERE id NOT IN (select size_id from product_sizes);`;

  // purge non used colors.
  await sql`
  DELETE FROM color_options WHERE id NOT IN (select color_id from product_colors);`;

  return allProducts;
}

export async function getProductsById(productsId) {
  const products = await productsId.map(async (singleProductId) => {
    const rawProductObject = await sql`
    SELECT * FROM product where id = ${singleProductId};`;

    const sizeOptions = await sql`
    SELECT product.id, size_options.size_option_name
      FROM product
      JOIN product_sizes
        ON product.id = product_sizes.product_id
      JOIN size_options
        ON size_options.id = product_sizes.size_id where product.id = ${singleProductId};`;

    const colorOptions = await sql`
    SELECT product.id, color_options.color_option_name
      FROM product
      JOIN product_colors
        ON product.id = product_colors.product_id
      JOIN color_options
        ON color_options.id = product_colors.color_id where product.id = ${singleProductId};`;

    const sizeOptionsCamel = sizeOptions.map((obj) => {
      return {
        id: obj.id,
        sizeOptionName: obj.size_option_name,
      };
    });

    const colorOptionsCamel = colorOptions.map((obj) => {
      return {
        id: obj.id,
        colorOptionName: obj.color_option_name,
      };
    });

    const sizeOptionsReduced = sizeOptionsCamel.reduce(
      (acc, productOptions) => {
        acc[productOptions.id]
          ? (acc[productOptions.id] = [
              ...acc[productOptions.id],
              productOptions.sizeOptionName,
            ])
          : (acc[productOptions.id] = [productOptions.sizeOptionName]);

        return acc;
      },
      {},
    );

    const colorOptionsReduced = colorOptionsCamel.reduce(
      (acc, productOptions) => {
        acc[productOptions.id]
          ? (acc[productOptions.id] = [
              ...acc[productOptions.id],
              productOptions.colorOptionName,
            ])
          : (acc[productOptions.id] = [productOptions.colorOptionName]);

        return acc;
      },
      {},
    );

    return rawProductObject.map((basicProps) => {
      return {
        ...basicProps,
        sizeOptions: sizeOptionsReduced[basicProps.id],
        colorOptions: colorOptionsReduced[basicProps.id],
      };
    });
  });
  //return an array of product objects
  return Promise.all(products).then((res) => res.map((product) => product[0]));
}
