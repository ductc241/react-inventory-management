import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as supplierServices from "../../../api/supplier.api";

const SidebarNhaCungCap = () => {
  //Nhà Cung Cấp
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    async function getSuppliers() {
      const { data } = await supplierServices.list();
      setSuppliers(data);
    }
    getSuppliers();
  }, []);
  return (
    <div>
      <aside className="w-auto border rounded" aria-label="Sidebar">
        <div className="overflow-y-auto bg-white rounded drop-shadow-xl">
          <ul className="space-y-2">
            <li>
              <div
                className="flex items-center p-2 w-full text-lg font-normal text-gray-900 transition duration-75 group bg-[#F3F4F6]"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Nhà Cung Cấp
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
            {suppliers?.map((item: any) => {
              if (!item) return;
              return (
                <li className="px-3" key={item.id}>
                  <Link
                    to="#"
                    className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <span className="flex-1 whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
            <br />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarNhaCungCap;
