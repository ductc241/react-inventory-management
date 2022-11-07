export interface IProduct {
  id: number;
  sku: string;
  name: string;
  category_id: number;
  price: number;
  import_price: number;
  quantity: number;
  description: string;
  warranty_date: number;
  status: 0 | 1;
}

export interface ICreateProduct {
  sku: string;
  name: string;
  category_id: number | null;
  price: number;
  import_price: number;
  quantity: number;
  description: string;
  warranty_date: number;
  status: 0 | 1;
}
