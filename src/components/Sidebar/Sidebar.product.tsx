import React from "react";
import SidebarBaoHanh from "./SidebarBaoHanh";
import SidebarCategory from "./SidebarCategory";
import SidebarHienThi from "./SidebarHienThi";
import SidebarNhaCungCap from "./SidebarNhaCungCap";
import SidebarThoiGianMua from "./SidebarThoiGianMua";
import SidebarThuocTinh from "./SidebarThuocTinh";
import SidebarTonKho from "./SidebarTonKho";

const SidebarProduct = () => {
  return (
    <div>
      <div className="space-y-4">
        <SidebarCategory />
        <SidebarNhaCungCap />
        <SidebarTonKho />
        <SidebarThuocTinh />
        <SidebarHienThi />
        <SidebarThoiGianMua />
        <SidebarBaoHanh />
      </div>
    </div>
  );
};

export default SidebarProduct;
