import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="p-4 md:px-6 md:py-8 ">
        <hr className="my-16 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <Link to="#" target="_blank" className="hover:underline">
            POLY WAREH™
          </Link>
          . Đã đăng ký Bản quyền
        </span>
      </footer>
    </div>
  );
};

export default Footer;
