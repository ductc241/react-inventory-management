import { Outlet } from "react-router-dom";
import LayoutHeader from "./Layout.header";
import LayoutSidebar from "./Layout.sidebar";
import "./Layout.style.css";

const LayoutMain = () => {
  return (
    <div className="flex min-h-[100vh]">
      <div>
        <LayoutSidebar />
      </div>
      <div className="grow bg-gray-100">
        <LayoutHeader />
        <div className="p-5 rounded-md">
          <div className="bg-white p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutMain;
