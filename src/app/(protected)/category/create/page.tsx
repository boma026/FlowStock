"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/Category";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CategoryCreatePage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Category>();

  const handleCreateCategory = async (data: Category) => {
    const createCategoryPromise = categoryService.createCategory(data);
    toast.promise(createCategoryPromise, {
      loading: "Criando categoria...",
      success: () => {
        router.push("/category");
        return "Categoria criado com sucesso!";
      },
      error: "Nome já existente.",
    });
  };

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Nova categoria</p>
      </header>
      <hr />
      <form onSubmit={handleSubmit(handleCreateCategory)}>
        <div className="flex flex-col gap-2 ml-4">
          <label htmlFor="category" className="font-extrabold">
            Nome da categoria
          </label>
          <Input
            className="w-1/2 mb-4"
            placeholder="Nome da categoria"
            id="category"
            type="text"
            {...register("name", { required: true })}
          />
          <Button size="lg" className="w-1/10" type="submit">
            Criar categoria
          </Button>
        </div>
      </form>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
