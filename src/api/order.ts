import instance from "./instance";
import { IOrderCreate } from "../types/order.type";

const orderServices = {
  creatOrder: (order: IOrderCreate) => {
    const url = "/orders";
    return instance.post(url, order);
  }
};

export default orderServices;
