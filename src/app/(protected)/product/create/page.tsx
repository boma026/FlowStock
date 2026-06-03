"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { privateApi } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/Category";
import { productsService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";

export default function ProductCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCreateProduct = async (data: Product) => {
    try {
      await productsService.createProduct(data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/product");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await categoryService.getAllCategories();
        setCategories(categories);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

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
        <p className="title">Novo produto</p>
      </header>
      <hr />
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="flex flex-col gap-2 ml-4 w-1/2">
          <label htmlFor="name" className="font-extrabold">
            Nome do produto
          </label>
          <Input
            className="w-1/2 mb-4"
            placeholder="Nome do produto"
            id="name"
            type="text"
            {...register("name", { required: true })}
          />
          <div className="flex gap-6">
            <div className="flex flex-col flex-1 w-full">
              <label htmlFor="produto" className="font-extrabold">
                Categoria
              </label>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-1/2" onBlur={field.onBlur}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col flex-1 w-full">
              <label htmlFor="name" className="font-extrabold">
                Preço Unitário (em R$)
              </label>
              <Input
                className="mb-4"
                placeholder="Nome da categoria"
                id="name"
                type="text"
                defaultValue={0}
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col flex:1 w-full">
              <label htmlFor="produto" className="font-extrabold">
                Quantidade mín.
              </label>
              <Input
                className="mb-4"
                placeholder="Nome da categoria"
                id="name"
                type="text"
                defaultValue={0}
                {...register("minQuantity", { required: true })}
              />
            </div>
            <div className="flex flex-col flex:1 w-full">
              <label htmlFor="name" className="font-extrabold">
                Quantidade máx.
              </label>
              <Input
                className="mb-4"
                placeholder="Nome da categoria"
                id="name"
                type="text"
                defaultValue={0}
                {...register("maxQuantity", { required: true })}
              />
            </div>
          </div>
          <Button size="lg" type="submit">
            Criar produto
          </Button>
        </div>
      </form>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
