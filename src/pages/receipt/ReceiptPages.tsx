import SidebarHienThi from "../../components/Sidebar/Sidevar_Children/SidebarHienThi";
import TableReceipt from "../../modules/receipt/TableReceipt";

const ReceiptPages = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-2 border">
        <SidebarHienThi />
      </div>
      <div className="col-span-10">
        <TableReceipt />
      </div>
    </div>
  );
};

export default ReceiptPages;
