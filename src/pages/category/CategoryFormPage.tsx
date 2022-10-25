import CategoryForm from "../../modules/category/CategoryForm/CategoryForm";
const CategoryCreatePage = () => {
  return <CategoryForm mode="create" />;
};

const CategoryUpdatePage = () => {
  return <CategoryForm mode="update" />;
};

export { CategoryCreatePage, CategoryUpdatePage };
