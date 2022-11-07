import * as yup from "yup";

const ProductSchema = yup
  .object({
    sku: yup.string().required("Đây là trường bắt buộc"),
    name: yup.string().required("Đây là trường bắt buộc"),
    category_id: yup.number().required("Đây là trường bắt buộc"),
    price: yup.number().required("Đây là trường bắt buộc"),
    import_price: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc"),
    quantity: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc"),
    warranty_date: yup.number().required()
  })
  .required();

export default ProductSchema;
