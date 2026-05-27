"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { api } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

export default function ProductUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>();

  const handleUpdateProduct = async (data: Product) => {
    try {
      const res = await api.put(`/products/${id}`, {
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        maxQuantity: data.maxQuantity,
        minQuantity: data.minQuantity,
      });
      console.log("Product", res.data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/product");
    }
  };

  useEffect(() => {
    const fetchProductCategories = async () => {
      setLoading(true);
      try {
        const [product, categories] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);
        console.log("produto", product.data);
        console.log("categories", categories.data);
        setProduct(product.data);
        setCategories(categories.data);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductCategories();
  }, []);

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Novo produto</p>
      </header>
      <hr />
      <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <div className="flex flex-col gap-2 ml-4 w-1/2">
          <label htmlFor="name" className="font-extrabold">
            Nome do produto
          </label>
          <Input
            className="w-1/2 mb-4"
            placeholder="Nome do produto"
            id="name"
            defaultValue={product?.name}
            type="text"
            {...register("name")}
          />
          <div className="flex gap-6">
            <div className="flex flex-col flex:1 w-full">
              <label htmlFor="produto" className="font-extrabold">
                Categoria
              </label>
              <select
                className="border-2 rounded-md p-1"
                {...register("categoryId")}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex:1 w-full">
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
                {...register("minQuantity")}
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
                {...register("maxQuantity")}
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
