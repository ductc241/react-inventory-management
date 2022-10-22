import React from "react";
import { Link } from "react-router-dom";

const SidebarBaoHanh = () => {
  //Trạng thái bảo hành
  return (
    <div>
      <aside className="w-auto border rounded" aria-label="Sidebar">
        <div className="overflow-y-auto bg-gray-50 rounded dark:bg-slate-300 drop-shadow-xl">
          <ul className="space-y-2">
            <li>
              <div
                className="flex items-center p-2 w-full text-lg font-normal text-gray-900 transition duration-75 group dark:text-white bg-[#F3F4F6]"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Trạng thái bảo hành
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
              <div className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
                <span className="flex-1 whitespace-nowrap space-x-2">
                  <input type="radio" />
                  <label htmlFor="">Tất cả</label>
                </span>
              </div>
            </li>
            <li className="px-3">
              <div className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
                <span className="flex-1 whitespace-nowrap space-x-2">
                  <input type="radio" />
                  <label htmlFor="">Còn hạn</label>
                </span>
              </div>
            </li>
            <li className="px-3">
              <div className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
                <span className="flex-1 whitespace-nowrap space-x-2">
                  <input type="radio" />
                  <label htmlFor="">Hết hạn</label>
                </span>
              </div>
            </li>
            <br />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarBaoHanh;
