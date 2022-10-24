import CategoryForm from "../../modules/category/CategoryForm/CategoryForm";
const CategoryCreatePage = () => {
  return <CategorytForm mode="create" />;
};

const CategoryUpdatePage = () => {
  return <CategoryForm mode="update" />;
};

export { CategoryCreatePage, CategoryUpdatePage };
