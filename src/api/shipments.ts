import instance from "./instance";

export const listShipments = () => {
  const url = `import-shipment`;
  return instance.get(url);
};

export const addShipments = (data: any) => {
  const url = `import-shipment`;
  return instance.post(url, data);
};

export const getOneShipment = (id: number | string | undefined) => {
  const url = `/import_shipments/${id}`;
  return instance.get(url);
};

export const deleteShipment = (id: number | string | undefined) => {
  const url = `/import_shipments/${id}`;
  return instance.delete(url);
};

export const getSuppliersApi = () => {
  const url = `/suppliers`;
  return instance.get(url);
};

export const getProFormShipments = () => {
  const url = `/products1`;
  return instance.get(url);
};
