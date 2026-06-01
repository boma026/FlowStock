import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { Moves } from "@/types/Moves";
import { ChartData } from "@/types/ChartData";

type ChartProps = {
  moves: Moves[];
  chartDisplay: string;
  chartData30Days: ChartData[];
  chartData7days: ChartData[];
};

export function Chart({
  moves,
  chartDisplay,
  chartData30Days,
  chartData7days,
}: ChartProps) {
  const chartConfig = {
    price: {
      label: "Moves (R$)",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      {/* Passamos o 'chartData' agregado para o BarChart */}
      <BarChart
        accessibilityLayer
        data={chartDisplay === "weekly" ? chartData7days : chartData30Days}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date" // Mudamos para "date" para bater com o formato "DD/MM" que criamos
          tickLine={false}
          tickMargin={20}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="price" fill="var(--color-move)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
