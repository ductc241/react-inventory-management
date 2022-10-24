import React from "react";
import SidebarBaoHanh from "./Sidevar_Children/SidebarBaoHanh";
import SidebarCategory from "./Sidevar_Children/SidebarCategory";
import SidebarHienThi from "./Sidevar_Children/SidebarHienThi";
import SidebarNhaCungCap from "./Sidevar_Children/SidebarNhaCungCap";
import SidebarThoiGianMua from "./Sidevar_Children/SidebarThoiGianMua";
import SidebarThuocTinh from "./Sidevar_Children/SidebarThuocTinh";
import SidebarTonKho from "./Sidevar_Children/SidebarTonKho";

const SidebarCategorys = () => {
  return (
    <div>
      <div className="space-y-4">
        <SidebarCategory />
      </div>
    </div>
  );
};

export default SidebarCategorys;
