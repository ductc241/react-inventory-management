
import instance from "./instance";

export const add = (receipt: any) => {
  const url = `/receipt`;
  return instance.post(url, receipt);
};

export const list = () => {
  const url = "/receipt";
  return instance.get(url);
};

export const get = (id: number) => {
  const url = `/receipt/${id}`;
  return instance.get(url);
};

export const remove = (id: number) => {
  const url = `/receipt/${id}`;
  return instance.delete(url);
};

export const update = (receipt: any) => {
  const url = `receipt/${receipt.id}`;
  return instance.put(url, receipt);
};
