import postgres from 'postgres';
import dotenv from 'dotenv';
import { setPostgresDefaultsOnHeroku } from '../setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenv.config();
const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

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

  const sizeOptionsCamel = sizeOptions.map((obj) => {
    return {
      id: obj.id,
      sizeOptionName: obj.size_option_name,
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

  return products.map((product) => {
    return {
      ...product,
      sizeOptions: sizeOptionsReduced[product.id],
      qty: 1,
      size: sizeOptionsReduced[product.id][0],
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
  INSERT INTO product ${sql(newProduct, 'name', 'category', 'price', 'img')}
  RETURNING * ;`;

  const sizesIdFromDb = await sql`
  SELECT size_option_name FROM size_options;`;

  const optionsObj = newProduct.sizeOptions.map((opt) => {
    return { size_option_name: opt };
  });

  const reduced = sizesIdFromDb.reduce((acc, obj) => {
    if (
      acc.map((item) => item.size_option_name).includes(obj.size_option_name)
    ) {
      return acc.filter(
        (item) => item.size_option_name !== obj.size_option_name,
      );
    }
    return acc;
  }, optionsObj);

  if (reduced.length !== 0) {
    await sql`
  INSERT INTO size_options ${sql(reduced, 'size_option_name')}`;
  }

  for (const size of newProduct.sizeOptions) {
    await sql`
    INSERT INTO product_sizes VALUES (${product[0].id}, (SELECT id FROM size_options WHERE size_option_name = ${size}));`;
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

  return allProducts;
}

export async function getProductsById(productsId) {
  const products = await productsId.map(async (product) => {
    const productPrice = await sql`
    SELECT * FROM product where id = ${product};`;

    const sizeOptions = await sql`
    SELECT product.id, size_options.size_option_name
      FROM product
      JOIN product_sizes
        ON product.id = product_sizes.product_id
      JOIN size_options
        ON size_options.id = product_sizes.size_id where product.id = ${product};`;

    const sizeOptionsCamel = sizeOptions.map((obj) => {
      return {
        id: obj.id,
        sizeOptionName: obj.size_option_name,
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

    return productPrice.map((item) => {
      return {
        ...item,
        sizeOptions: sizeOptionsReduced[item.id],
      };
    });
  });

  return Promise.all(products).then((res) => res.map((product) => product[0]));
}
