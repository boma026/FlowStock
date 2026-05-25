"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/Category";
import { api } from "@/utils/axios";
import { Delete, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("/category");
        console.log("category", res.data);
        setCategories(res.data);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Nova categoria</p>
      </header>
      <hr />
      <Input />
    </div>
  );
}
