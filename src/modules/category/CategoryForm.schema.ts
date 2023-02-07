import * as yup from "yup";

const CategorySchema = yup
  .object({
    name: yup
      .string()
      .required("Đây là trường bắt buộc")
      .max(255, "Độ dài tối đa là 255"),
    parent_id: yup.number().required("Đây là trường bắt buộc")
  })
  .required();

export default CategorySchema;
