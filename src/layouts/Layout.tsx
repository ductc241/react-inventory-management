import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

import Header from "../components/Header/Header";

import "./Layout.style.css";

const LayoutMain = () => {
  return (
    <>
      <Header />
      {/* <div className="container mx-auto mt-4">
        <Outlet />
      </div>
      <Footer /> */}
    </>
  );
};

export default LayoutMain;
