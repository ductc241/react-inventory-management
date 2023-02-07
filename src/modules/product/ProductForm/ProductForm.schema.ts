import * as yup from "yup";

const ProductSchema = yup
  .object({
    name: yup
      .string()
      .required("Đây là trường bắt buộc")
      .max(255, "Độ dài tối đa là 255"),
    category_id: yup.number().required("Đây là trường bắt buộc"),
    price: yup
      .number()
      .typeError("Nhập số giá hàng hóa")
      .required("Đây là trường bắt buộc")
      .min(1, "Giá tối thiểu phải phải >=1"),

    import_price: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc")
      .min(1, "Giá tối thiểu phải phải >=1"),
    quantity: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc")
      .min(1, "Số lượng tối thiểu phải phải >=1"),
    warranty_date: yup
      .number()
      .typeError("Nhập số lương hàng hóa")
      .required("Đây là trường bắt buộc")
      .min(1, "Số lượng tối thiểu phải phải >=1")
  })
  .required();

export default ProductSchema;
