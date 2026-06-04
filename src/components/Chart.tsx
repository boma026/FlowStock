import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { ChartData } from "@/types/ChartData";

type ChartProps = {
  chartDisplay: string;
  chartData: ChartData[];
};

export function Chart({ chartData }: ChartProps) {
  const chartConfig = {
    price: {
      label: "Moves (R$)",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
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
