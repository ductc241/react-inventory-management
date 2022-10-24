import SidebarCategorys from "../../components/Sidebar/Sidebar.categorys";
import CategoryList from "../../modules/category/CategoryList";

const CategoryListPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-2">
        <SidebarCategorys />
      </div>
      <div className="col-span-10">
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryListPage;
