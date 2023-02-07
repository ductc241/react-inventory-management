import instance from "./instance";

const refundServices = {
  addCustomerRefundBill: (data: any) => {
    const url = "refund-order";
    return instance.post(url, data);
  }
};

export default refundServices;
