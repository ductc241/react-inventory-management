import { ICategory } from "./../types/category.type";
import instance from "./instance";

export const addCategoryAPI = (category: ICategory) => {
  const url = `categories`;
  return instance.post(url, category);
};
export const listCategoryAPI = () => {
  const url = "categories";
  return instance.get(url);
};
export const getCategoryAPI = (id: number | string | undefined) => {
  const url = `category/${id}`;
  return instance.get(url);
};
export const removeCategoryAPI = (id: number) => {
  const url = `category/${id}`;
  return instance.delete(url);
};
export const updateCategoryAPI = (category: ICategory) => {
  const url = `category/${category.id}`;
  return instance.put(url, category);
};
