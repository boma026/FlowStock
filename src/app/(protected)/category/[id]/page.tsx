"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/Category";
import { api } from "@/utils/axios";
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
        const res = await api.get(`category/${id}`);
        console.log("category", res.data);
        setCategory(res.data);
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
      const res = await api.put(`/category/${id}`, {
        name: data.name,
      });
      console.log("category", res.data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/category");
    }
  };

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
