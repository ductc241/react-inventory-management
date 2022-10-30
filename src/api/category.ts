import { ICategory } from "./../types/category.type";
import instance from "./instance";
// import { isAuthenticate } from "../utils/localStorage";

// const { token, user } = isAuthenticate();

export const add = (category: ICategory) => {
  const url = `category`;
  return instance.post(url, category);
};
export const list = () => {
  const url = "category";
  return instance.get(url);
};
export const get = (id: number | string | undefined) => {
  const url = `category/${id}`;
  return instance.get(url);
};
export const remove = (id: number) => {
  const url = `category/${id}`;
  return instance.delete(url);
};
export const update = (category: ICategory) => {
  const url = `category/${category.id}`;
  return instance.put(url, category);
};
