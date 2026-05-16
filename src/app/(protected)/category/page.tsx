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
import { Category } from "@/types/Category";
import { Delete, SquarePen } from "lucide-react";

export default function CategoryPage() {
  const categoryData: Category[] = [
    { id: 1, name: "bebidas", quantityProducts: 2 },
    { id: 2, name: "alimentos", quantityProducts: 2 },
  ];

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Categorias</p>
        <Button size="lg">Nova categoria</Button>
      </header>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Nome</TableHead>
            <TableHead className="w-1/3">Quantidade</TableHead>
            <TableHead className="w-1/3 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.quantityProducts} produtos</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <Button>
                  <SquarePen />
                </Button>

                <Button variant="destructive">
                  <Delete />
                </Button>
              </TableCell>
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
