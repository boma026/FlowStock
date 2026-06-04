"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Product } from "@/types/Product";
import { Delete, SquarePen, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsService } from "@/services/productService";
import { toast } from "sonner";

export default function ProductPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await productsService.getAllProducts();
        setProducts(products);
      } catch (error: unknown) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [refreshKey]);

  const handleChangeToAddProduct = () => {
    router.push("/product/create");
  };

  const handleUpdateProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleDeleteProduct = async (id: number) => {
    const deleteProductPromise = productsService.deleteProduct(Number(id));
    toast.promise(deleteProductPromise, {
      loading: "deletando produto...",
      success: () => {
        setRefreshKey((prev) => prev + 1);
        return "Produto excluído com sucesso!";
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
        <p className="title">Produtos</p>
        <Button size="lg" onClick={handleChangeToAddProduct}>
          Novo Produto
        </Button>
      </header>
      <hr />
      <Field orientation="horizontal" className="border-2 p-4 w-1/2 rounded-xl">
        <Input
          type="search"
          placeholder="Pesquise um produto."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>Buscar</Button>
      </Field>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="1/5">Nome</TableHead>
            <TableHead className="w-1/5">Categoria</TableHead>
            <TableHead className="w-1/5 ">Preço Unit.</TableHead>
            <TableHead className="w-1/5 ">Qt. em Estoque</TableHead>
            <TableHead className="w-1/5 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <Button onClick={() => handleUpdateProduct(product.id)}>
                  <SquarePen />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={product.moves.length >= 1 ? true : false}
                    >
                      <Delete />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Deletar produto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza? Isto irá deletar a produto pemanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
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
