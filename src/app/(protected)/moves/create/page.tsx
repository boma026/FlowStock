"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Moves } from "@/types/Moves";
import { Product } from "@/types/Product";
import { api } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function MoveCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<Moves>({
    defaultValues: {
      quantity: 0,
      productId: "",
      type: "Inbound",
    },
  });
  const [products, setProducts] = useState<Product[]>([]);

  const handleCreateMove = async (data: Moves) => {
    try {
      const res = await api.post("/moves", {
        quantity: data.quantity,
        type: data.type,
        productId: data.productId,
      });
      console.log("Product", res.data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/moves");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Nova movimentação</p>
      </header>
      <hr />
      <form onSubmit={handleSubmit(handleCreateMove)}>
        <div className="flex flex-col gap-2 ml-4 w-1/2">
          <label htmlFor="name" className="font-extrabold">
            Nome do produto
          </label>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => {
              const selectedProductName =
                products.find(
                  (p) => p.id.toString() === field.value?.toString(),
                )?.name ?? "";
              return (
                <Combobox
                  items={products}
                  value={selectedProductName}
                  onValueChange={(val) => {
                    const selectedProduct = products.find(
                      (p) => p.name === val,
                    );
                    field.onChange(
                      selectedProduct ? selectedProduct.id.toString() : "",
                    );
                  }}
                >
                  <ComboboxInput
                    className="w-1/2 mb-4"
                    onBlur={field.onBlur}
                    placeholder="Nome do produto"
                    id="name"
                    type="text"
                    showClear
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {products.map((product: Product) => (
                        <ComboboxItem key={product.id} value={product.name}>
                          <div>
                            <div className="text-xl font-bold">
                              {product.name}
                            </div>
                            <div className="text">
                              Estoque: {product.quantity} / R${" "}
                              {product.price.toFixed(2)}
                            </div>
                          </div>
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              );
            }}
          />

          <div className="flex gap-6">
            <div className="flex flex-col flex-1 w-full">
              <label htmlFor="produto" className="font-extrabold">
                Tipo
              </label>
              <select
                className="border-2 rounded-md p-1"
                {...register("type", { required: true })}
              >
                <option value="Inbound">Entrada(+)</option>
                <option value="Outbound">Saída(-)</option>
              </select>
            </div>
            <div className="flex flex-col flex-1 w-full">
              <label htmlFor="name" className="font-extrabold">
                Quantidade (un)
              </label>
              <Input
                className="mb-4"
                placeholder="Nome da categoria"
                id="name"
                type="text"
                defaultValue={0}
                {...register("quantity", { required: true })}
              />
            </div>
          </div>
          <Button size="lg" type="submit">
            Confirmar Movimentação
          </Button>
        </div>
      </form>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
