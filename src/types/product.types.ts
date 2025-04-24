import { OrderType } from "./order.types";

// for user
export interface ProductItem {
  id: number;
  categoryId: number;
  categoryName: string;
  images: string;
  name: string;
  description: string;
  languageId: number;
}

// for admin
export interface TranslationType {
  id: number;
  name: string;
  description: string;
  languageId: number;
  productId: number;
}
export interface LangType {
  id: number;
  name: string;
  languageId: number;
  categoryId: number;
}
export interface AdminProductItem {
  id: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  images: string;
  num?: number;
  Order?: OrderType[];
  translations: TranslationType[];
  category?: {
    translations: LangType[];
  };
}

// Create product type
export interface TranslationProduct {
  name: string;
  description: string;
  languageId: number;
}
export interface ProductFormData {
  categoryId: number;
  images: File | string;
  translations: TranslationProduct[];
}
