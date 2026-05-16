"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Moves } from "@/types/Moves";
import { Product } from "@/types/Product";
import { Delete, SquarePen } from "lucide-react";
import { useState } from "react";

export default function MovesPage() {
  const movesData: Moves[] = [
    {
      id: 1,
      date: new Date("2024-01-10"),
      type: "Entrada",
      product: { name: "Arroz 5kg" },
      quantity: 50,
      price: 24,
    },
    {
      id: 2,
      date: new Date("2024-01-12"),
      type: "Saída",
      product: { name: "Feijão 1kg" },
      quantity: 10,
      price: 8,
    },
    {
      id: 3,
      date: new Date("2024-01-15"),
      type: "Entrada",
      product: { name: "Água Mineral 1,5L" },
      quantity: 100,
      price: 3,
    },
    {
      id: 4,
      date: new Date("2024-01-18"),
      type: "Saída",
      product: { name: "Refrigerante 2L" },
      quantity: 20,
      price: 10,
    },
    {
      id: 5,
      date: new Date("2024-01-20"),
      type: "Entrada",
      product: { name: "Macarrão 500g" },
      quantity: 80,
      price: 5,
    },
    {
      id: 6,
      date: new Date("2024-01-22"),
      type: "Saída",
      product: { name: "Azeite 500ml" },
      quantity: 5,
      price: 32,
    },
    {
      id: 7,
      date: new Date("2024-01-25"),
      type: "Entrada",
      product: { name: "Suco de Laranja 1L" },
      quantity: 60,
      price: 9,
    },
    {
      id: 8,
      date: new Date("2024-01-27"),
      type: "Saída",
      product: { name: "Leite Integral 1L" },
      quantity: 15,
      price: 7,
    },
    {
      id: 9,
      date: new Date("2024-01-29"),
      type: "Entrada",
      product: { name: "Café Solúvel 100g" },
      quantity: 40,
      price: 15,
    },
    {
      id: 10,
      date: new Date("2024-01-30"),
      type: "Saída",
      product: { name: "Farinha de Trigo 1kg" },
      quantity: 25,
      price: 6,
    },
  ];

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Movimentações</p>
        <Button size="lg">Nova movimentação</Button>
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
          {movesData.map((move) => (
            <TableRow key={move.id}>
              <TableCell className="font-medium">
                {move.date.toLocaleDateString()}
              </TableCell>
              <TableCell>{move.type}</TableCell>
              <TableCell>{move.product.name}</TableCell>
              <TableCell>{move.quantity}</TableCell>
              <TableCell>{move.price}</TableCell>
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
