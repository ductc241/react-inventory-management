import * as yup from "yup";

const SupplierSchema = yup
  .object({
    name: yup
      .string()
      .required("Đây là trường bắt buộc")
      .max(255, "Độ dài tối đa là 255"),
    address: yup
      .string()
      .required("Đây là trường bắt buộc")
      .max(255, "Độ dài tối đa là 255"),

    phone: yup
      .number()
      .typeError("Nhập số điện thoại")
      .required("Đây là trường bắt buộc")
  })
  .required();

export default SupplierSchema;
