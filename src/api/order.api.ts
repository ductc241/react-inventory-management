
import instance from "./instance";

export const add = (orders: any) => {
  const url = `/orders`;
  return instance.post(url, orders);
};

export const list = () => {
  const url = "/orders";
  return instance.get(url);
};

export const getOrder = (codeBill: string) => {
  const url = `/orders/${codeBill}`;
  return instance.get(url);
};



