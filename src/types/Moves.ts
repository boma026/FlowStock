import { Product } from "./Product";

export type Moves = {
  id: number;
  date: Date;
  type: "Entrada" | "Saída";
  product: Pick<Product, "name">;
  quantity: number;
  price: number;
};
