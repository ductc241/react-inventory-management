import CategoryAdd from "../../modules/category/CategoryForm/CategoryAdd";
import CategoryUpdate from "../../modules/category/CategoryForm/CategoryUpdate";
const CategoryCreatePage = () => {
  return <CategoryAdd mode="create" />;
};

const CategoryUpdatePage = () => {
  return <CategoryUpdate mode="update" />;
};

export { CategoryCreatePage, CategoryUpdatePage };
