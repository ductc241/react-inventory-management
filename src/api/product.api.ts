import instance from "./instance";

export const getProducts = () => {
  const url = "/products";
  return instance.get(url);
};
