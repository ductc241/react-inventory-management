import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import SidebarProduct from "../components/Sidebar/Sidebar.product";

import "./Layout.style.css";

const LayoutProduct = () => {
  return (
    <div className="containers">
      <Header />
      <div className="grid grid_container">
        <div className="grid_left">
          <SidebarProduct />
        </div>
        <div className="grid_right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutProduct;
