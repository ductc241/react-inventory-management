import instance from "./instance";

const customerServices = {
  getList: () => {
    const url = "customers";
    return instance.get(url);
  }
};

export default customerServices;
