export type ProductType = {
  category: string;
  id: number;
  img: string;
  img2: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  sizeOptions: string[];
  color: string;
  colorOptions: string[];
  sizeId?: number;
  colorId?: number;
};

export type CookieObjType = {
  id: number;
  qty: number;
  sizeId: number;
  colorId: number;
};

export type CookieType = CookieObjType[];
