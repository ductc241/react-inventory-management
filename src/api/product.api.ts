import instance from "./instance";

const productServices = {
  getProducts: () => {
    const url = "/products";
    return instance.get(url);
  },

  getProductById: (id: string | number) => {
    const url = `/products/${id}`;
    return instance.get(url);
  },

  updateProduct: (id: number, data: any) => {
    const url = `/products/${id}`;
    return instance.post(url, data);
  }
};

export default productServices;
