"use client";

import { Chart } from "@/components/Chart";
import { ModeToggle } from "@/components/ModeToggle";
import { ProductCard } from "@/components/ProductCard";
import { SummaryCard } from "@/components/SummaryCard.";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useDashboardData } from "@/hooks/useDashboardData";
import { useState } from "react";

export default function Dashboard() {
  const [chartDisplay, setChartDisplay] = useState<string>("weekly");

  const {
    loading,
    stockValue,
    moveStats,
    chartData,
    stagnantProducts,
    lowStockProducts,
  } = useDashboardData(chartDisplay);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

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
              onValueChange={setChartDisplay}
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
          <SummaryCard
            title="Valor em estoque"
            value={stockValue}
            footerText="Valor total atual"
          />
          <SummaryCard
            title="Entradas no período"
            value={moveStats?.inboundValue}
            footerText={`${moveStats.inboundCount} ${moveStats.inboundCount > 1 ? " Movimentações" : " Movimentação"}`}
          />
          <SummaryCard
            title="Saídas no período"
            value={moveStats?.outboundValue}
            footerText={`${moveStats.outboundCount} ${moveStats.outboundCount > 1 ? " Movimentações" : " Movimentação"}`}
          />
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
              <Chart chartDisplay={chartDisplay} chartData={chartData} />
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="flex flex-1">
        <section className="flex flex-row flex-wrap w-full gap-4">
          <ProductCard products={lowStockProducts} />
          <ProductCard products={stagnantProducts} />
        </section>
      </div>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
