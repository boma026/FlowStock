import { useState, useEffect, useMemo } from "react";
import { privateApi } from "@/utils/axios";
import { Product } from "@/types/Product";
import { Moves } from "@/types/Moves";
import { ChartData } from "@/types/ChartData";

export function useDashboardData(chartDisplay: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [moves, setMoves] = useState<Moves[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsMoves = async () => {
      setLoading(true);
      try {
        const [productsRes, movesRes] = await Promise.all([
          privateApi.get("/products"),
          privateApi.get("/moves"),
        ]);
        setProducts(productsRes.data);
        setMoves(movesRes.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsMoves();
  }, []);

  const cutoffDate = useMemo(() => {
    const days = chartDisplay === "weekly" ? 7 : 30;
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [chartDisplay]);

  const stockValue = useMemo(() => {
    if (!Array.isArray(products)) return 0;
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [products]);

  const moveStats = useMemo(() => {
    const stats = {
      inboundValue: 0,
      outboundValue: 0,
      inboundCount: 0,
      outboundCount: 0,
    };
    if (!Array.isArray(moves)) return stats;

    return moves.reduce((acc, move) => {
      const [day, month, year] = move.createdAt.split("/");
      const moveYear = year ? Number(year) : new Date().getFullYear();
      const moveDateObj = new Date(moveYear, Number(month) - 1, Number(day));

      if (moveDateObj >= cutoffDate) {
        if (move.type === "Inbound") {
          acc.inboundValue += move.price;
          acc.inboundCount++;
        } else {
          acc.outboundValue += move.price;
          acc.outboundCount++;
        }
      }
      return acc;
    }, stats);
  }, [moves, cutoffDate]);

  const chartData = useMemo(() => {
    const days = chartDisplay === "weekly" ? 7 : 30;
    const dataMap = new Map<string, number>();
    const chartDataList: ChartData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      dataMap.set(`${day}/${month}`, 0);
    }

    moves.forEach((move) => {
      if (move.type === "Outbound") {
        const [day, month] = move.createdAt.split("/");
        const formattedMoveDate = `${day}/${month}`;
        if (dataMap.has(formattedMoveDate)) {
          dataMap.set(
            formattedMoveDate,
            (dataMap.get(formattedMoveDate) || 0) + move.price,
          );
        }
      }
    });

    dataMap.forEach((totalPrice, dateString) => {
      chartDataList.push({ date: dateString, price: totalPrice });
    });

    return chartDataList;
  }, [moves, chartDisplay]);

  const stagnantProducts = useMemo(() => {
    // Set to store IDS that has no repetition
    const recentlyMovedIds = new Set<string | number>();

    moves.forEach((move) => {
      if (move.type === "Outbound") {
        // string date to Date Object
        const [day, month, year] = move.createdAt.split("/");
        const moveYear = year ? Number(year) : new Date().getFullYear();
        const moveDateObj = new Date(moveYear, Number(month) - 1, Number(day));

        // if the move occurred inside the chart display, we store the ID
        if (moveDateObj >= cutoffDate) {
          recentlyMovedIds.add(move.product.id);
        }
      }
    });

    return products.filter((product) => !recentlyMovedIds.has(product.id));
  }, [products, moves, chartDisplay]);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      (product) => product.quantity <= product.minQuantity * 1.6,
    );
  }, [products]);

  return {
    loading,
    stockValue,
    moveStats,
    chartData,
    stagnantProducts,
    lowStockProducts,
  };
}
