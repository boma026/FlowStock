"use client";

import { Chart } from "@/components/Chart";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moves } from "@/types/Moves";
import { Product } from "@/types/Product";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [moves, setMoves] = useState<Moves[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const stockValue = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const moveStats = moves.reduce(
    (acc, move) => {
      if (move.type === "Inbound") {
        acc.inboundValue = move.price;
        acc.inboundCount++;
      } else {
        acc.outboundValue = move.price;
        acc.outboundCount++;
      }
      return acc;
    },
    { inboundValue: 0, outboundValue: 0, inboundCount: 0, outboundCount: 0 },
  ) ?? { inboundValue: 0, outboundValue: 0, inboundCount: 0, outboundCount: 0 };

  useEffect(() => {
    const fetchProductsMoves = async () => {
      setLoading(true);
      try {
        const [products, moves] = await Promise.all([
          api.get("/products"),
          api.get("/moves"),
        ]);
        console.log("produtos", products.data);
        console.log("moves", moves.data);
        setProducts(products.data);
        setMoves(moves.data);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsMoves();
  }, []);

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-8">
      <div className="flex flex-col gap-2 flex-1 ">
        <header className="flex justify-between ">
          <p className="title">Dashboard</p>
          <div className="flex items-center gap-2">
            <p className="text">Período:</p>

            <Select defaultValue="weekly">
              <SelectTrigger className="w-full max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="weekly">Últimos 7 dias</SelectItem>
                  <SelectItem value="monthly">Últimos 30 dias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <hr />
        <section className="mt-4 flex flex-wrap gap-6 ">
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Valor em estoque</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R${stockValue}</p>
            </CardContent>
            <CardFooter>
              <p className="text">Valor total atual</p>
            </CardFooter>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Entradas do período</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R${moveStats.inboundValue.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <p className="text">
                {moveStats.inboundCount}{" "}
                {moveStats.inboundCount > 1 ? "Movimentações" : "Movimentação"}
              </p>
            </CardFooter>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Saídas do período</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R${moveStats.outboundValue.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <p className="text">
                {moveStats.outboundCount}{" "}
                {moveStats.outboundCount > 1 ? "Movimentações" : "Movimentação"}
              </p>
            </CardFooter>
          </Card>
        </section>
        <main className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Saídas diárias</CardTitle>
              <CardDescription>
                Volume de saídas no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Chart />
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="flex flex-1">
        <section className="flex flex-row flex-wrap w-full gap-4">
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Estoque baixo</CardTitle>
              <CardDescription>
                Produtos com quantidade próximas ou abaixo do mínimo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Produtos Estagnados</CardTitle>
              <CardDescription>
                Sem saídas no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
