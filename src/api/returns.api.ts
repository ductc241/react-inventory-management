import { IReturns } from "../types/returns.type";
import instance from "./instance";

export const addReturnsAPI = (returns: IReturns) => {
  const url = `/refund-order`;
  return instance.post(url, returns);
};
export const listReturnsAPI = () => {
  const url = "/refund-order";
  return instance.get(url);
};
export const getReturnsAPI = (id: number | string) => {
  const url = `/refund-order/${id}`;
  return instance.get(url);
};
export const removeReturnsAPI = (id: number) => {
  const url = `/refund-order/${id}`;
  return instance.delete(url);
};
export const updateReturnsAPI = (id: any, returns: any) => {
  const url = `/refund-order/${id}`;
  return instance.put(url, returns);
};
