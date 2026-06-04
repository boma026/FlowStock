import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { privateApi } from "@/utils/axios";

export const productsService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await privateApi.get("/products");
    return res.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const res = await privateApi.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (product: Product): Promise<Product> => {
    const res = await privateApi.post("/products", {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      maxQuantity: product.maxQuantity,
      minQuantity: product.minQuantity,
    });
    return res.data;
  },

  updateProduct: async (
    id: number,
    product: Partial<Product>,
  ): Promise<Product> => {
    const res = await privateApi.put(`/products/${id}`, {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      maxQuantity: product.maxQuantity,
      minQuantity: product.minQuantity,
    });
    return res.data;
  },

  deleteProduct: async (id: number): Promise<Product> => {
    const res = await privateApi.delete(`/products/${id}`);
    return res.data;
  },
};
