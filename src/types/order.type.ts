interface IProductOrder {
  id: number;
  quantity: number;
  price: number;
}

export interface IOrderCreate {
  user_id: number;
  export_type: number;
  payment: number;
  products: IProductOrder[];

  supplier_id: number | null;
  user_name: string | null;
  phone_number: string | null;
  address: string;
  description: string;

  export_date: string;
  receve_phone: string | null;
}
