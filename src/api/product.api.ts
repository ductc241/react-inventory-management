import instance from "./instance";

const productServices = {
  getProducts: () => {
    const url = "/products";
    return instance.get(url);
  },

  getLotCodeById: (id: string | number) => {
    const url = `/products/${id}`;
    return instance.get(url);
  },

  getProductById: (id: string | number) => {
    const url = `/product/${id}`;
    return instance.get(url);
  },

  createProduct: (data: any) => {
    const url = `/products`;
    return instance.post(url, data);
  },

  updateProduct: (id: number, data: any) => {
    const url = `/products/${id}`;
    return instance.put(url, data);
  }
};

export default productServices;
