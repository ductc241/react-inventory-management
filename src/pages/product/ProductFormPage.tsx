import ProductForm from "../../modules/product/ProductForm/ProductForm";

const ProductCreatePage = () => {
  return <ProductForm mode="create" />;
};

const ProductUpdatePage = () => {
  return <ProductForm mode="update" />;
};

export { ProductCreatePage, ProductUpdatePage };
