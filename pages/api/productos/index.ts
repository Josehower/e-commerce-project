import { NextApiRequest, NextApiResponse } from 'next';
import { getInventory } from '../../../utils/dataBase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const inventory = await getInventory();
  res.statusCode = 200;
  res.json(inventory);
};
