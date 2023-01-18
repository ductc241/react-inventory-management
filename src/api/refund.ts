import instance from "./instance";

export const getRefund = () => {
  const url = `/refund-order`;
  return instance.get(url);
};

export const getDetailRefund = (id: any) => {
  const url = `/refund-order/${id}`;
  return instance.get(url);
};
