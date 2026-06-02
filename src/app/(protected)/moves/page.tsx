"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { movesService } from "@/services/movesService";
import { Moves } from "@/types/Moves";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovesPage() {
  const router = useRouter();
  const [moves, setMoves] = useState<Moves[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        setLoading(true);
        const moves = await movesService.getAllMoves();
        setMoves(moves);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoves();
  }, []);

  const handleChangeToAddMove = () => {
    router.push("/moves/create");
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Movimentações</p>
        <Button size="lg" onClick={handleChangeToAddMove}>
          Nova movimentação
        </Button>
      </header>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="2/10">Data</TableHead>
            <TableHead className="w-2/10">Tipo</TableHead>
            <TableHead className="w-4/10 ">Produto</TableHead>
            <TableHead className="w-1/10 ">Qntde</TableHead>
            <TableHead className="w-1/10 ">Valor Unit.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moves.map((move) => (
            <TableRow key={move.id}>
              <TableCell className="font-medium">
                {move.createdAt.toString()}
              </TableCell>
              <TableCell
                className={` font-bold ${move.type === "Inbound" ? "text-green-400" : "text-red-400"} `}
              >
                {move.type === "Inbound" ? "Entrada" : "Saída"}
              </TableCell>
              <TableCell>{move.product.name}</TableCell>
              <TableCell>{move.quantity}</TableCell>
              <TableCell>R${move.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
