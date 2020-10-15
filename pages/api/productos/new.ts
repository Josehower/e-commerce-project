import { NextApiRequest, NextApiResponse } from 'next';
import { getInventory, createNewProduct, deleteProductById } from '../../../utils/dataBase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method=== "POST"){
    createNewProduct(req.body)
    res.statusCode = 200;
    res.json({"res":"Created"});
    return
  }
  if(req.method=== "DELETE"){

    const allProducts = await deleteProductById(req.body)
    console.log(allProducts);
    res.statusCode = 200;
    res.json(allProducts);
    return
  }
  const inventory = await getInventory();
  res.statusCode = 200;
  res.json(inventory);
};
