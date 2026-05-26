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
import { Delete, SquarePen, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CategoryPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("/category");
        setCategories(res.data);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categories]);

  const handleChangeToAddCategory = () => {
    router.push("/category/create");
  };

  const handleUpdateCategory = (id: number) => {
    router.push(`/category/${id}`);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      console.log("passou aq");
      const res = await api.delete(`/category/${id}`);
      console.log("category", res.data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
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
                <Button onClick={() => handleUpdateCategory(category.id)}>
                  <SquarePen />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={category.products.length >= 1 ? true : false}
                    >
                      <Delete />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Deletar categoria?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza? Isto irá deletar a categoria
                        pemanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
