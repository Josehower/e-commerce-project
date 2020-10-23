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
  sizeId?: number;
};

export type CookieObjType = {
  id: number;
  qty: number;
  sizeId: number;
};

export type CookieType = CookieObjType[];
