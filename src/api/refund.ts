import instance from "./instance";

export const getRefund = () => {
  const url = `/refund-order`;
  return instance.get(url);
};
