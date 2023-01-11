import { IReturns } from "../types/returns.type";
import instance from "./instance";

export const addReturnsAPI = (returns: IReturns) => {
  const url = `returns`;
  return instance.post(url, returns);
};
export const listReturnsAPI = () => {
  const url = "returns";
  return instance.get(url);
};
export const getReturnsAPI = (id: number | string | undefined) => {
  const url = `returns/${id}`;
  return instance.get(url);
};
export const removeReturnsAPI = (id: number) => {
  const url = `returns/${id}`;
  return instance.delete(url);
};
export const updateReturnsAPI = (id: any, returns: any) => {
  const url = `returns/${id}`;
  return instance.put(url, returns);
};
