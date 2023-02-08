import * as yup from "yup";

const CategorySchema = yup
  .object({
    name: yup
      .string()
      .required("Đây là trường bắt buộc")
      .min(2, "Độ dài tối đa là 2")
      .max(255, "Độ dài tối đa là 255"),
    parent_id: yup.number()
  })
  .required();

export default CategorySchema;
