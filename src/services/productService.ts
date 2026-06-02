import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { api } from "@/utils/axios";

export const productsService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (product: Product): Promise<Product> => {
    const res = await api.post("/products", {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      maxQuantity: product.maxQuantity,
      minQuantity: product.minQuantity,
    });
    return res.data;
  },

  updateProduct: async (id: number, product: Product): Promise<Product> => {
    const res = await api.put(`/products/${id}`, {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      maxQuantity: product.maxQuantity,
      minQuantity: product.minQuantity,
    });
    return res.data;
  },

  deleteProduct: async (id: number): Promise<Product> => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
