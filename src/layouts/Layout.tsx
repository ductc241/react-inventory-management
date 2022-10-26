import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

import "./Layout.style.css";

const LayoutMain = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-6">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutMain;
