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

export const updateCategory = async (id: number, data: CategoryFormData) => {
  const form = new FormData();

  if (data.logo instanceof File) {
    form.append("logo", data.logo);
  }

  data.translations.forEach((t, index) => {
    form.append(`translations[${index}][name]`, t.name);
    form.append(`translations[${index}][languageId]`, String(t.languageId));
  });

  await axiosInstance.patch(`/api/caterory/${id}`, form);
};
