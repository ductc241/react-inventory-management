import instance from "./instance";

const staticalServices = {
  getBillOfProducts: ({
    startDay,
    endDay
  }: {
    startDay: string;
    endDay: string;
  }) => {
    const url = `products/count-export?from_date=${startDay}&to_date=${endDay}`;
    return instance.get(url);
  }
};

export default staticalServices;
