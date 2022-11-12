import SidebarCategorys from "../../components/Sidebar/Sidebar.categorys";
import SoQuyList from "../../modules/SoQuy/SoQuyList";
const SoQuyListPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-2">
        <SidebarCategorys />
      </div>
      <div className="col-span-10">
        <SoQuyList />
      </div>
    </div>
  );
};

export default SoQuyListPage;
