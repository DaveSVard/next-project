export type UserT = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type ProductT = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?:CategoryT;
  categoryId?:number
  images?: string[];
};

export type CategoryT = {
  id:number;
  name:string;
  image:string;
};
