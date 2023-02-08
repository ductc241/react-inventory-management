import * as yup from "yup";

const ProductSchema = yup
  .object({
    name: yup
      .string()
      .required("Đây là trường bắt buộc")
      .min(2, "Độ dài tối thiểu là 2 ký tự")
      .max(255, "Độ dài tối đa là 255 ký tự"),
    category_id: yup.number().required("Đây là trường bắt buộc"),
    status: yup.number().required("Đây là trường bắt buộc"),
    price: yup
      .number()
      .typeError("Trường này phải là số")
      .required("Đây là trường bắt buộc")
      .min(1, "Giá tối thiểu phải phải lớn hơn 1"),

    // import_price: yup
    //   .number()
    //   .typeError("Nhập số lương hàng hóa")
    //   .required("Đây là trường bắt buộc")
    //   .min(1, "Giá tối thiểu phải phải >=1"),
    // quantity: yup
    //   .number()
    //   .typeError("Nhập số lương hàng hóa")
    //   .required("Đây là trường bắt buộc")
    //   .min(1, "Số lượng tối thiểu phải phải >=1"),
    warranty_date: yup
      .number()
      .typeError("Nhập số tháng bảo hành")
      .required("Đây là trường bắt buộc")
      .min(0, "Số tháng tối thiểu là 0")
  })
  .required();

export default ProductSchema;
