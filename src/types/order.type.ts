interface IProductOrder {
  id: number;
  quantity: number;
  price: number;
}

export interface IOrderCreate {
  user_id: number;
  address?: string;
  export_date: string;
  phone?: string;
  total_price: number;
  products: IProductOrder[];
  status: string;
}
