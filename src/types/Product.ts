import { Category } from "./Category";

export type Product = {
  id: number;
  name: string;
  category: Pick<Category, "name">;
  quantInStock: number;
  price: number;
};
