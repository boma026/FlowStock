import { Product } from "@/types/Product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProductCardProps = {
  products: Product[];
};

export const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <Card className="w-full lg:flex-1">
      <CardHeader>
        <CardTitle className="subtitle">Estoque baixo</CardTitle>
        <CardDescription>
          Produtos com quantidade próximas ou abaixo do mínimo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {products.map((product) => {
          return (
            <div className="mb-2" key={product.id}>
              <div className="flex justify-between">
                <h2 className="font-bold">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </h2>
                <h2 className="font-bold">R${product.price.toFixed(2)}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="text">Qnt: {product.quantity} un</h2>
                <h2 className="text">min: {product.minQuantity}</h2>
              </div>
            </div>
          );
        })}
        <hr />
      </CardContent>
    </Card>
  );
};
