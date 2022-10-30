import * as yup from "yup";

const ProductSchema = yup
  .object({
    sku: yup.string().required("Đây là trường bắt buộc"),
    name: yup.string().required("Đây là trường bắt buộc"),
    brand_id: yup.number().required("Đây là trường bắt buộc"),
    category_id: yup.string().required("Đây là trường bắt buộc"),
    price: yup.string().required("Đây là trường bắt buộc"),
    import_price: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc"),
    quantity: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc"),
    weight: yup.number()
  })
  .required();

export default ProductSchema;