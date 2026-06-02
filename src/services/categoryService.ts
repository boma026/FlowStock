import { Category } from "@/types/Category";
import { api } from "@/utils/axios";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const res = await api.get("/categories");
    return res.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: Category): Promise<Category> => {
    const res = await api.post("/users", {
      name: category.name,
    });
    return res.data;
  },

  updateCategory: async (id: number, category: Category): Promise<Category> => {
    const res = await api.put(`/categories/${id}`, {
      name: category.name,
    });
    return res.data;
  },

  deleteCategory: async (id: number): Promise<Category> => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  },
};
