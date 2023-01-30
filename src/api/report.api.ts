import instance from "./instance";

const reportServices = {
  getRevenueOverview: () => {
    const url = "/statistical";
    return instance.get(url);
  },

  getRevenueByProduct: (data: any) => {
    const url = "/statistical/product";
    return instance.post(url, data);
  },

  getRevenueBySupplier: (data: any) => {
    const url = "/statistical/supplier";
    return instance.post(url, data);
  },

  getInventoryProduct: (data: any) => {
    const url = "/statistical/inventoryProduct";
    return instance.post(url, data);
  },

  getInventorySupplier: (data: any) => {
    const url = "/statistical/inventorySupplier";
    return instance.post(url, data);
  }
};

export default reportServices;
