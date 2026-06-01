"use client";

import { Chart } from "@/components/Chart";
import { ModeToggle } from "@/components/ModeToggle";
import { SummaryCards } from "@/components/SummaryCards.";
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
import { ChartData } from "@/types/ChartData";
import { Moves } from "@/types/Moves";
import { Product } from "@/types/Product";
import { api } from "@/utils/axios";
import { useEffect, useMemo, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [moves, setMoves] = useState<Moves[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartDisplay, setChartDisplay] = useState<string>("weekly");

  const stockValue = Array.isArray(products)
    ? products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0)
    : 0;

  const moveStats = Array.isArray(moves)
    ? moves.reduce(
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
        {
          inboundValue: 0,
          outboundValue: 0,
          inboundCount: 0,
          outboundCount: 0,
        },
      )
    : { inboundValue: 0, outboundValue: 0, inboundCount: 0, outboundCount: 0 };

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

  const handleChangeDisplay = (value: string) => {
    setChartDisplay(value);
  };

  const chartData30Days = useMemo(() => {
    const dataMap = new Map<string, number>();
    const chartDataList: ChartData[] = [];

    // 1. Gera os últimos 7 dias cronologicamente (do mais antigo para o de hoje)
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Formata a data para "DD/MM" (ex: "30/05")
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}/${month}`;
      // Inicializa o dia com R$ 0
      dataMap.set(formattedDate, 0);
    }
    console.log("rodou o datamap", dataMap);

    // 2. Itera sobre as movimentações e soma os valores nos dias correspondentes
    moves.filter((move) => move.type === "Outbound");
    moves.forEach((move) => {
      const moveDate = move.createdAt;
      const moveDay = moveDate.split("/")[0];
      const moveMonth = moveDate.split("/")[1];
      const formattedMoveDate = `${moveDay}/${moveMonth}`;
      // Se a data da movimentação estiver dentro dos últimos 7 dias, soma o preço
      if (dataMap.has(formattedMoveDate)) {
        console.log("entrou aqui, ou seja bateu o valor");
        const currentTotal = dataMap.get(formattedMoveDate) || 0;
        dataMap.set(formattedMoveDate, currentTotal + move.price);
      }
    });

    // 3. Converte o Map de volta para o array de objetos que o Recharts espera
    dataMap.forEach((totalPrice, dateString) => {
      chartDataList.push({
        date: dateString,
        price: totalPrice,
      });
    });

    return chartDataList;
  }, [moves]);

  // useMemo cria os dados do gráfico agregados por dia
  const chartData7Days = useMemo(() => {
    const dataMap = new Map<string, number>();
    const chartDataList: ChartData[] = [];

    // 1. Gera os últimos 7 dias cronologicamente (do mais antigo para o de hoje)
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Formata a data para "DD/MM" (ex: "30/05")
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}/${month}`;
      // Inicializa o dia com R$ 0
      dataMap.set(formattedDate, 0);
    }

    // 2. Itera sobre as movimentações e soma os valores nos dias correspondentes
    moves.filter((move) => move.type === "Outbound");
    moves.forEach((move) => {
      const moveDate = move.createdAt;
      const moveDay = moveDate.split("/")[0];
      const moveMonth = moveDate.split("/")[1];
      const formattedMoveDate = `${moveDay}/${moveMonth}`;

      // Se a data da movimentação estiver dentro dos últimos 7 dias, soma o preço
      if (dataMap.has(formattedMoveDate)) {
        const currentTotal = dataMap.get(formattedMoveDate) || 0;
        dataMap.set(formattedMoveDate, currentTotal + move.price);
      }
    });

    // 3. Converte o Map de volta para o array de objetos que o Recharts espera
    dataMap.forEach((totalPrice, dateString) => {
      chartDataList.push({
        date: dateString,
        price: totalPrice,
      });
    });

    return chartDataList;
  }, [moves]); // Só recalcula se a prop 'moves' mudar

  const stagnantProducts = useMemo(() => {
    // 1. Define quantos dias vamos olhar para trás
    const days = chartDisplay === "weekly" ? 7 : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    cutoffDate.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias

    // 2. Usamos um Set para guardar os IDs sem repetições (muito mais rápido que array)
    const recentlyMovedIds = new Set<string | number>();

    moves.forEach((move) => {
      if (move.type === "Outbound") {
        // Converte a data da string (assumindo DD/MM ou DD/MM/YYYY) para um objeto Date
        const [day, month, year] = move.createdAt.split("/");
        const moveYear = year ? Number(year) : new Date().getFullYear();
        const moveDateObj = new Date(moveYear, Number(month) - 1, Number(day));

        // Se a movimentação ocorreu DENTRO do período selecionado, guardamos o ID
        if (moveDateObj >= cutoffDate) {
          recentlyMovedIds.add(move.product.id);
        }
      }
    });

    // 3. Retorna a lista de produtos, excluindo os que tiveram movimentação recente
    return products.filter((product) => !recentlyMovedIds.has(product.id));
  }, [products, moves, chartDisplay]);

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-8">
      <div className="flex flex-col gap-2 flex-1 ">
        <header className="flex justify-between ">
          <p className="title">Dashboard</p>
          <div className="flex items-center gap-2">
            <p className="text">Período:</p>

            <Select
              defaultValue="weekly"
              value={chartDisplay}
              onValueChange={handleChangeDisplay}
            >
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
          <SummaryCards
            title="Valor em estoque"
            value={stockValue}
            footerText="Valor total atual"
          />
          {/*<SummaryCards title="Entradas no período" value={moveStats?.inboundValue.toFixed(2)} footerText={moveStats.inboundCount} {moveStats.inboundCount > 1 ? " Movimentações" : " Movimentação"}/>*/}
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Entradas do período</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R${moveStats?.inboundValue.toFixed(2)}</p>
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
              <Chart
                chartDisplay={chartDisplay}
                moves={moves.filter((move) => move.type === "Outbound")}
                chartData30Days={chartData30Days}
                chartData7days={chartData7Days}
              />
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
              {products.map((product) => {
                const lowStockTrigger =
                  product.quantity <= product.minQuantity * 1.6;
                if (!lowStockTrigger) return null;
                return (
                  <div className="mb-2" key={product.id}>
                    <div className="flex justify-between">
                      <h2 className="font-bold">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1)}
                      </h2>
                      <h2 className="font-bold">
                        R${product.price.toFixed(2)}
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text">Qnt: {product.quantity} un</h2>
                      <h2 className="text">min: {product.minQuantity}</h2>
                    </div>
                  </div>
                );
              })}
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
              {stagnantProducts.map((product) => {
                return (
                  <div className="mb-2" key={product.id}>
                    <div className="flex justify-between">
                      <h2 className="font-bold">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1)}
                      </h2>
                      <h2 className="font-bold">
                        R${product.price.toFixed(2)}
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text">Qnt: {product.quantity} un</h2>
                      <h2 className="text">min: {product.minQuantity}</h2>
                    </div>
                  </div>
                );
              })}
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
