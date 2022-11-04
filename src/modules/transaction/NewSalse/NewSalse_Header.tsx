import React from "react";
import { CloseIcon, NavbarIcon, SearchIcon } from "../../../components/icons";

const NewSalse_Header = () => {
  return (
    <div className="flex justify-between items-center bg-blue-500">
      <div className="flex gap-5">
        <div className="inline-flex items-center bg-white m-2 py-2 pl-3 pr-8 rounded-md">
          <SearchIcon fill="gray" width={16} className="mr-2" />
          <input
            type="text"
            placeholder="Tìm hàng hóa"
            className="border-none outline-none bg-transparent w-[400px] text-base"
          />
        </div>

        <div className="mt-2 flex gap-x-3">
          <div className="flex h-full gap-5 items-center bg-gray-100 px-5 rounded-t-md">
            <p className="text-base font-bold">Hóa đơn 1</p>
            <CloseIcon fill="gray" className="hover:cursor-pointer" />
          </div>

          <div className="flex h-full gap-5 items-center bg-none px-5 rounded-t-md">
            <p className="text-base font-bold text-white">Hóa đơn 2</p>
            <CloseIcon fill="white" className="hover:cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 py-2 px-4 text-white text-base">
        <p>0922345555</p>
        <NavbarIcon fill="white" width={20} />
      </div>
    </div>
  );
};

export default NewSalse_Header;
