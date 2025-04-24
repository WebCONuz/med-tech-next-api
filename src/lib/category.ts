import { CategoryFormData } from "../types/category.types";
import axiosInstance from "./axios";

export const getCategories = async () => {
  const res = await axiosInstance.get("/api/category");
  if (res.status === 200) {
    return res.data.data;
  }
};

export const createCategory = async (data: CategoryFormData) => {
  console.log(data);

  const form = new FormData();

  form.append("logo", data.logo); // Fayl File tipida bo'lishi kerak

  data.translations.forEach((t, index) => {
    form.append(`translations[${index}][name]`, t.name);
    form.append(`translations[${index}][languageId]`, String(t.languageId));
  });

  await axiosInstance.post("/api/category", form);
};

export const updateCategory = async (id: number, logo: string | File) => {
  if (typeof logo !== "string") {
    const form = new FormData();
    form.append("logo", logo);
    await axiosInstance.patch(`/api/category/${id}`, form);
  }
};

export const updateCategoryTranslation = async (
  id: number,
  data: { name: string; languageId: number }
) => {
  await axiosInstance.patch(
    `/api/category/${id}/translation/${data.languageId}`,
    data
  );
};
