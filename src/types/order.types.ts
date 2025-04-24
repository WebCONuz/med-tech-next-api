import { TranslationType } from "./product.types";

export interface OrderType {
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
type ProductType = {
  id: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  images: string;
  translations: TranslationType[];
};

export type OrderItem = OrderType & {
  product: ProductType;
};
