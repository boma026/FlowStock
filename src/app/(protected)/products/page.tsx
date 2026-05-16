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
import { Product } from "@/types/Product";
import { Delete, SquarePen } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const [search, setSearch] = useState<string>("");

  const productData: Product[] = [
    {
      id: 1,
      name: "Arroz 5kg",
      price: 24,
      category: { name: "alimentos" },
      quantInStock: 5,
    },
    {
      id: 2,
      name: "Feijão 1kg",
      price: 8,
      category: { name: "alimentos" },
      quantInStock: 12,
    },
    {
      id: 3,
      name: "Macarrão 500g",
      price: 5,
      category: { name: "alimentos" },
      quantInStock: 20,
    },
    {
      id: 4,
      name: "Azeite 500ml",
      price: 32,
      category: { name: "alimentos" },
      quantInStock: 8,
    },
    {
      id: 5,
      name: "Farinha de Trigo 1kg",
      price: 6,
      category: { name: "alimentos" },
      quantInStock: 15,
    },
    {
      id: 6,
      name: "Água Mineral 1,5L",
      price: 3,
      category: { name: "bebidas" },
      quantInStock: 50,
    },
    {
      id: 7,
      name: "Suco de Laranja 1L",
      price: 9,
      category: { name: "bebidas" },
      quantInStock: 18,
    },
    {
      id: 8,
      name: "Refrigerante 2L",
      price: 10,
      category: { name: "bebidas" },
      quantInStock: 30,
    },
    {
      id: 9,
      name: "Leite Integral 1L",
      price: 7,
      category: { name: "bebidas" },
      quantInStock: 25,
    },
    {
      id: 10,
      name: "Café Solúvel 100g",
      price: 15,
      category: { name: "alimentos" },
      quantInStock: 10,
    },
  ];

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Produtos</p>
        <Button size="lg">Novo Produto</Button>
      </header>
      <hr />
      <Field orientation="horizontal" className="border-2 p-4 w-1/2 rounded-xl">
        <Input
          type="search"
          placeholder="Pesquise um produto."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>Buscar</Button>
      </Field>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="1/5">Nome</TableHead>
            <TableHead className="w-1/5">Categoria</TableHead>
            <TableHead className="w-1/5 ">Preço Unit.</TableHead>
            <TableHead className="w-1/5 ">Qt. em Estoque</TableHead>
            <TableHead className="w-1/5 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantInStock}</TableCell>
              <div className="flex justify-center">
                <TableCell className="flex justify-center">
                  <Button>
                    <SquarePen />
                  </Button>
                </TableCell>
                <TableCell className="flex justify-center">
                  <Button variant="destructive">
                    <Delete />
                  </Button>
                </TableCell>
              </div>
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
