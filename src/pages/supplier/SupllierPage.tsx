import SidebarNhaCungCap from "../../components/Sidebar/SidebarNhaCungCap";
import TableSupplier from "../../modules/supplier/TableSupplier";

const SuplierPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-2 border">
        <SidebarNhaCungCap />
      </div>
      <div className="col-span-10">
        <TableSupplier />
      </div>
    </div>
  );
};

export default SuplierPage;
