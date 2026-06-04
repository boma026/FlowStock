"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { privateApi } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Category } from "@/types/Category";
import { productsService } from "@/services/productService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryService } from "@/services/categoryService";
import { toast } from "sonner";

export default function ProductUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, control, reset } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        setLoading(true);
        const [product, categories] = await Promise.all([
          productsService.getProductById(Number(id)),
          categoryService.getAllCategories(),
        ]);

        const fetchedProduct = product;
        setProduct(product);
        setCategories(categories);
        reset({
          ...fetchedProduct,
          categoryId: fetchedProduct.categoryId,
        });
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductCategories();
  }, []);

  const handleUpdateProduct = async (data: Product) => {
    const updatedData = Object.fromEntries(
      Object.entries(data).map((item) => {
        const key = item[0];
        const value = item[1];

        const newValue = value === "" ? undefined : value;

        return [key, newValue];
      }),
    ) as Partial<Product>;

    const updateProductPromise = productsService.updateProduct(
      Number(id),
      updatedData,
    );
    toast.promise(updateProductPromise, {
      loading: "Editando produto...",
      success: () => {
        router.push("/product");
        return "Produto editado com sucesso!";
      },
      error: "Erro ao editar produto. Verifique os dados",
    });
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
        <p className="title">Editar produto</p>
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
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger onBlur={field.onBlur}>
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
            <div className="flex flex-col flex:1 w-full">
              <label htmlFor="name" className="font-extrabold">
                Preço Unitário (em R$)
              </label>
              <Input
                className="mb-4"
                placeholder="Nome da categoria"
                id="name"
                type="text"
                defaultValue={product?.price}
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
                defaultValue={product?.minQuantity}
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
                defaultValue={product?.maxQuantity}
                {...register("maxQuantity")}
              />
            </div>
          </div>
          <Button size="lg" type="submit" className="w-1/4">
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
