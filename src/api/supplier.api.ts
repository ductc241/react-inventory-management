import { ISupplier } from "../types/supplier.type";
import instance from "./instance";

export const add = (supplier: ISupplier) => {
  const url = `/supplier`;
  return instance.post(url, supplier);
};

export const list = () => {
  const url = "/suppliers";
  return instance.get(url);
};

export const get = (id: number) => {
  const url = `/supplier/${id}`;
  return instance.get(url);
};

export const remove = (id: number) => {
  const url = `/supplier/${id}`;
  return instance.delete(url);
};

export const update = (supplier: ISupplier) => {
  const url = `supplier/${supplier.id}`;
  return instance.put(url, supplier);
};
