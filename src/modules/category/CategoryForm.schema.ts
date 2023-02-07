import * as yup from "yup";

const CategorySchema = yup
  .object({
    name: yup.string().required("Đây là trường bắt buộc"),
    parent_id: yup.number().required("Đây là trường bắt buộc")
  })
  .required();

export default CategorySchema;
