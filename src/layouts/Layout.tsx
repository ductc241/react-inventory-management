import { Outlet } from "react-router-dom";
import LayoutHeader from "./Layout.header";
import LayoutSidebar from "./Layout.sidebar";
import "./Layout.style.css";

const LayoutMain = () => {
  return (
    <div className="flex">
      <div className="relative">
        <LayoutSidebar />
      </div>
      <div className="pl-[81px] lg:pl-[260px] grow bg-[#f7f9fc]">
        <LayoutHeader />
        <div className="container mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutMain;
