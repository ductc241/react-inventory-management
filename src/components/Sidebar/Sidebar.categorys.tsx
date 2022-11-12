import React from "react";
import SidebarCategory from "./Sidevar_Children/SidebarCategory";

const SidebarCategorys = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Nhóm hàng</h1>
        <SidebarCategory />
      </div>
    </div>
  );
};

export default SidebarCategorys;
