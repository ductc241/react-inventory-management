import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

import "./Layout.style.css";

const LayoutProduct = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutProduct;
