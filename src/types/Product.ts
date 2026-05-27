import { Category } from "./Category";

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
  minQuantity: number;
  maxQuantity: number;
  quantity: number;
  price: number;
};
