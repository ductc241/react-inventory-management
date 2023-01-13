import instance from "./instance";

export const addRecei = (receipt: any) => {
  const url = `/export-shipment`;
  return instance.post(url, receipt);
};

export const listRecei = () => {
  const url = "/export-shipment";
  return instance.get(url);
};

export const getRecei = (id: number) => {
  const url = `/export-shipment/${id}`;
  return instance.get(url);
};

export const removeRecei = (id: number) => {
  const url = `/export-shipment/${id}`;
  return instance.delete(url);
};

export const updateRecei = (receipt: any) => {
  const url = `export-shipment/${receipt.id}`;
  return instance.put(url, receipt);
};

export const exportShipmentsDetail = (id: number | undefined) => {
  const url = `/products/product-detail/${id}`;
  return instance.get(url);
};
