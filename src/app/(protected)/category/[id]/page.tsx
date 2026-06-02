"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/Category";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CategoryUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Category>();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const category = await categoryService.getCategoryById(Number(id));
        console.log("category", category);
        setCategory(category);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleUpdateCategory = async (data: Category) => {
    try {
      setLoading(true);
      const category = await categoryService.updateCategory(Number(id), data);
      console.log("category", category);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/category");
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Editar Categoria</p>
      </header>
      <hr />
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="flex flex-col gap-2 ml-4">
          <label htmlFor="category" className="font-extrabold">
            Nome da categoria
          </label>
          <Input
            className="w-1/2 mb-4"
            placeholder="Nome da categoria"
            defaultValue={category?.name}
            id="category"
            type="text"
            {...register("name", { required: true })}
          />
          <Button size="lg" className="w-1/10" type="submit">
            Salvar alterações
          </Button>
        </div>
      </form>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
