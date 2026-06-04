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
import { categoryService } from "@/services/categoryService";
import { toast } from "sonner";
import { CrudLayout } from "@/components/CrudLayout";
import { ColumnDef, DataTable } from "@/components/dataTable";

const categoryColumns: ColumnDef[] = [
  { label: "Nome", className: "w-1/3" },
  { label: "Quantidade", className: "w-1/3" },
  { label: "Ações", className: "w-1/3 text-center" },
];

export default function CategoryPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChangeToAddCategory = () => {
    router.push("/category/create");
  };

  const handleUpdateCategory = (id: number) => {
    router.push(`/category/${id}`);
  };

  const handleDeleteCategory = async (id: number) => {
    const deleteCategoryPromise = categoryService.deleteCategory(Number(id));
    toast.promise(deleteCategoryPromise, {
      loading: "Deletando categoria...",
      success: () => {
        setRefreshKey((prev) => prev + 1);
        return "Categoria excluída com sucesso!";
      },
      error: "Erro ao realizar exclusão. Tente novamente mais tarde",
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const categories = await categoryService.getAllCategories();
        setCategories(categories);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <CrudLayout
      title="Categorias"
      onActionClick={handleChangeToAddCategory}
      actionText="Nova categoria"
    >
      <DataTable columns={categoryColumns}>
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
                    disabled={category.products.length >= 1}
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
                      Tem certeza? Isto irá deletar a categoria permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </CrudLayout>
  );
}
