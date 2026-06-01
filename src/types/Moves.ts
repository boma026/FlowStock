import { Product } from "./Product";

export type Moves = {
  id: number;
  createdAt: string;
  productId: string;
  product: Product;
  quantity: number;
  type: "Inbound" | "Outbound";
  price: number;
};
