import { Product } from "./Product";

export type Moves = {
  id: number;
  createdAt: Date;
  productId: string;
  product: Product;
  quantity: number;
  type: "Inbound" | "Outbound";
  price: number;
};
