import { Moves } from "@/types/Moves";
import { api } from "@/utils/axios";

export const movesService = {
  getAllMoves: async (): Promise<Moves[]> => {
    const res = await api.get("/moves");
    return res.data;
  },
  createMoves: async (moves: Moves): Promise<Moves> => {
    const res = await api.post("/moves", {
      quantity: moves.quantity,
      type: moves.type,
      productId: moves.productId,
    });
    return res.data;
  },
};
