import instance from "./instance";

export const listShipments = () => {
  const url = `import-shipment`;
  return instance.get(url);
};

export const addShipments = (data: any) => {
  const url = `import-shipment`;
  return instance.post(url, data);
};

export const getOneShipment = (id: number) => {
  const url = `import-shipment/${id}`;
  return instance.get(url);
};

export const getSuppliersApi = () => {
  const url = `/suppliers`;
  return instance.get(url);
};
