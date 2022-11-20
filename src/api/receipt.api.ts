
import instance from "./instance";

export const addRecei = (receipt: any) => {
  const url = `/import-shipment`;
  return instance.post(url, receipt);
};

export const listRecei = () => {
  const url = "/import-shipment";
  return instance.get(url);
};

export const getRecei = (id: number) => {
  const url = `/import-shipment/${id}`;
  return instance.get(url);
};

export const removeRecei = (id: number) => {
  const url = `/import-shipment/${id}`;
  return instance.delete(url);
};

export const updateRecei = (receipt: any) => {
  const url = `import-shipment/${receipt.id}`;
  return instance.put(url, receipt);
};
