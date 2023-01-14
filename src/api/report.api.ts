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
  }
};

export default reportServices;
