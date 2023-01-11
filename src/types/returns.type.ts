export type IReturns = {
  id?: number;
  user_id: number;
  user_name: string;
  seller_name: string;
  refund_code: string;
  refund_price_totail: number;
  refund_totall_quantity: number;
  status: number;
  description: string;
  refund_type: number;
}
export enum ReturnsAction {
  ADD,
  EDIT,
  REMOVE
}
