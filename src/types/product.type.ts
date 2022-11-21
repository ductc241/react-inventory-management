import { number } from "yup/lib/locale";

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  category_id: number | null;
  price: number;
  import_price: number;
  quantity: number;
  description: string;
  status: number;
  warranty_date: number;
}

export interface IProductCreate extends Omit<IProduct, "id" | "sku"> {
  supplier_id?: number;
}
