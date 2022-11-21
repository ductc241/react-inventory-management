import { useState } from "react";
import { Button, Select, TextField } from "../../../components";
import { IProduct } from "./../../../types/product.type";
const ExportShipments = () => {
  const [data, setData] = useState<any>([]);
  return (
    <form className="grid grid-cols-2 gap-10 ">
      <div className="col-span-1 shadow-md rounded-lg">
        <div className="border-b p-5">
          <p>Thông tin</p>
        </div>
        <div className="p-5">
          <TextField
            name="Nhà cung cấp"
            label="Nhà cung cấp"
            className="mb-5"
          />
          <TextField
            name="Nhà cung cấp"
            label="Nhà cung cấp"
            className="mb-5"
          />
          <TextField
            name="Nhà cung cấp"
            label="Nhà cung cấp"
            className="mb-5"
          />
          <div>
            <p className="mb-1">Ghi chú</p>
            <textarea className="w-full border-2 h-[80px] border-[#DEDEDE] rounded-lg outline-none"></textarea>
          </div>
        </div>
      </div>
      <div className="col-span-1 shadow-md rounded-lg h-max">
        <div className="border-b p-5">
          <p>Thanh toán</p>
        </div>
        <div className="p-5">
          <TextField
            name="Nhà cung cấp"
            label="kiểu thanh toán"
            className="mb-5"
          />
          <TextField
            name="Nhà cung cấp"
            label="Ngày hẹn thanh toán"
            type="date"
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="mb-3">
          <p>Sản phẩm</p>
        </div>
        <TextField
          name=""
          type="text"
          onChange={(e: any) => {
            console.log(e.target.value);
          }}
        />
        {data.length > 0 ? (
          <>
            <select
              multiple
              id="countries_multiple"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {data.map((item: IProduct) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </>
        ) : null}
        <Button className="mt-3">Thêm</Button>
        <div></div>
      </div>
    </form>
  );
};
export default ExportShipments;
