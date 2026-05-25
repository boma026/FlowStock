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
import { api } from "@/utils/axios";
import { Delete, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const router = useRouter();

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

  const handleChangeToAddCategory = () => {
    router.push("/category/create");
  };

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Categorias</p>
        <Button size="lg" onClick={handleChangeToAddCategory}>
          Nova categoria
        </Button>
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {category.products.length}{" "}
                {category.products.length >= 2 ? "produtos" : "produto"}
              </TableCell>
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
