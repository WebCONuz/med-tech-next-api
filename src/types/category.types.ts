import { LangType } from "./product.types";

// category type
export interface Translation {
  name: string;
  languageId: number;
}
export interface CategoryFormData {
  logo: File | string;
  translations: Translation[];
}

export type categoryType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  logo: string;
  num?: number;
  translations: LangType[];
};
