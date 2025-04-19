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
interface OrderType {
  id: number;
  productId: number;
  company: string;
  phone: string;
  email: string;
  type: string;
  title: string;
  content: string;
  code: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface TranslationType {
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
