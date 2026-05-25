export type Moves = {
  id: number;
  date: Date;
  productId: number;
  type: "Inbound" | "Outbound";
  price: number;
};
