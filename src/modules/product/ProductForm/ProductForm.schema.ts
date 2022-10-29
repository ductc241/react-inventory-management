import * as yup from "yup";

const ProductSchema = yup
  .object({
    sku: yup.string().required(),
    name: yup.string().required(),
    brand: yup.string(),
    category_id: yup.string(),
    price: yup.string().required(),
    import_price: yup.string().required(),
    quantity: yup.number().required(),
    weight: yup.number()
  })
  .required();

export default ProductSchema;
