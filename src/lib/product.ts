import {
  AdminProductItem,
  ProductFormData,
  TranslationProduct,
} from "../types/product.types";
import api from "./axios";

interface GetProductsResponse {
  data: AdminProductItem[];
  total: number;
}

export const getAdminProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<GetProductsResponse> => {
  const response = await api.get("/api/product/admin", {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};

export const deleteProduct = async (id: number | undefined): Promise<void> => {
  if (id) await api.delete(`/api/product/${id}`);
};

export const createProduct = async (data: ProductFormData): Promise<void> => {
  const formData = new FormData();

  if (!(data.images instanceof File)) {
    throw new Error("Fayl kiritilmagan");
  }

  formData.append("categoryId", data.categoryId.toString());
  formData.append("images", data.images as File);

  data.translations.forEach((t, i) => {
    formData.append(`translations[${i}][name]`, t.name);
    formData.append(`translations[${i}][description]`, t.description);
    formData.append(`translations[${i}][languageId]`, t.languageId.toString());
  });

  await api.post("/api/product", formData);
};

export const updateProduct = async (
  id: number,
  data: { categoryId: number; images: File | string }
): Promise<void> => {
  const formData = new FormData();
  formData.append("categoryId", data.categoryId.toString());
  if (typeof data.images !== "string")
    formData.append("images", data.images as File);
  await api.patch(`/api/product/${id}`, formData);
};

export const updateProductTranslation = async (
  id: number,
  data: TranslationProduct
): Promise<void> => {
  await api.patch(`/api/product/${id}/translation/${data.languageId}`, data);
};
