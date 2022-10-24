import React from "react";
import { Link } from "react-router-dom";

const SidebarCategory = () => {
  //Nhóm hàng
  return (
    <div>
      <aside className="w-auto border rounded" aria-label="Sidebar">
        <div className="overflow-y-auto bg-white rounded drop-shadow-xl">
          <ul className="space-y-2">
            <li>
              <div
                className="flex items-center p-2 w-full text-lg font-normal text-gray-900 transition duration-75 group  bg-[#F3F4F6]"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Nhóm hàng
                </span>
                <div className="add_sidebar mr-2">
                  <Link to="#">
                    <img
                      src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1666464107/plus-symbol-button_vkbpat.png"
                      width="10px"
                    />
                  </Link>
                </div>
              </div>
            </li>
            <li className="px-3">
              <Link
                to="#"
                className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <span className="flex-1 whitespace-nowrap">Củ sạc</span>
              </Link>
            </li>
            <li className="px-3">
              <Link
                to="#"
                className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 whitespace-nowrap">Tai nghe</span>
              </Link>
            </li>
            <li className="px-3">
              <Link
                to="#"
                className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg  hover:bg-gray-100"
              >
                <span className="flex-1 whitespace-nowrap">Dây sạc</span>
              </Link>
            </li>
            <br />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarCategory;
