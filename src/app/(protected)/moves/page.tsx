"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { movesService } from "@/services/movesService";
import { Moves } from "@/types/Moves";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CrudLayout } from "@/components/CrudLayout";
import { ColumnDef, DataTable } from "@/components/dataTable";
import { LoadingScreen } from "@/components/LoadingScreen";

const movesColumns: ColumnDef[] = [
  { label: "Data", className: "w-2/10" },
  { label: "Tipo", className: "w-2/10" },
  { label: "Produto", className: "w-4/10" },
  { label: "Qntde", className: "w-1/10" },
  { label: "Valor Unit.", className: "w-1/10" },
];

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

  if (loading) return <LoadingScreen />;

  return (
    <CrudLayout
      title="Movimentações"
      actionText="Nova movimentação"
      onActionClick={handleChangeToAddMove}
    >
      <DataTable columns={movesColumns}>
        {moves.map((move) => (
          <TableRow key={move.id}>
            <TableCell className="font-medium">
              {move.createdAt.toString()}
            </TableCell>
            <TableCell
              className={`font-bold ${
                move.type === "Inbound" ? "text-green-400" : "text-red-400"
              }`}
            >
              {move.type === "Inbound" ? "Entrada" : "Saída"}
            </TableCell>
            <TableCell>{move.product.name}</TableCell>
            <TableCell>{move.quantity}</TableCell>
            <TableCell>R${move.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </CrudLayout>
  );
}
