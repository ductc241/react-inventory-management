export interface IProduct {
  id: number;
  sku: string;
  name: string;
  brand_id: string | null;
  category_id: number | null;
  price: number;
  import_price: number;
  quantity: number;
  weight: number;
}
