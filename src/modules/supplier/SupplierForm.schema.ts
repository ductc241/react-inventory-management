import * as yup from "yup";

const SupplierSchema = yup
  .object({
    name: yup.string().required("Đây là trường bắt buộc"),
    address: yup.string().required("Đây là trường bắt buộc"),
    phone: yup
      .number()
      .typeError("Đây là trường bắt buộc")
      .required("Đây là trường bắt buộc")
  })
  .required();

export default SupplierSchema;
