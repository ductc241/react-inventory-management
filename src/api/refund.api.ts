import instance from "./instance";

const refundServices = {
  addCustomerRefundBill: (data: any) => {
    const url = "refund-order";
    return instance.post(url, data);
  },

  addSupplierRefundBill: (data: any) => {
    const url = "refund-supplier";
    return instance.post(url, data);
  },

  getRefundOrderList: () => {
    const url = "refund-order";
    return instance.get(url);
  },

  getRefundSupplierList: () => {
    const url = "refund-supplier";
    return instance.get(url);
  }
};

export default refundServices;
