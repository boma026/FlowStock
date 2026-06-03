import { Category } from "@/types/Category";
import { privateApi } from "@/utils/axios";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const res = await privateApi.get("/categories");
    return res.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await privateApi.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: Category): Promise<Category> => {
    const res = await privateApi.post("/categories", {
      name: category.name,
    });
    return res.data;
  },

  updateCategory: async (id: number, category: Category): Promise<Category> => {
    const res = await privateApi.put(`/categories/${id}`, {
      name: category.name,
    });
    return res.data;
  },

  deleteCategory: async (id: number): Promise<Category> => {
    const res = await privateApi.delete(`/categories/${id}`);
    return res.data;
  },
};
