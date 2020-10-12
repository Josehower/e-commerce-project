import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';
import dotenv from 'dotenv';

dotenv.config();
const sql = postgres();

export async function getInventory(){

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

    const sizeOptionsCamel = sizeOptions.map(obj=>{return{
     "id":obj.id, "sizeOptionName":obj.size_option_name
    }})

    const sizeOptionsReduced = sizeOptionsCamel.reduce((acc, productOptions)=>{

      acc[productOptions.id]
      ? acc[productOptions.id] = [...acc[productOptions.id], productOptions.sizeOptionName]
      : acc[productOptions.id] = [productOptions.sizeOptionName]

      return acc

    },{});

    return products.map(product=>{return{...product,sizeOptions:sizeOptionsReduced[product.id], qty:1, size:sizeOptionsReduced[product.id][0] }})
}

export async function getCategories(){
  const categoriesObject = await sql`
  SELECT category FROM product;
`;

const categoyList = [...new Set(categoriesObject.map(obj=>obj.category))]

return  categoyList

}

getCategories()
