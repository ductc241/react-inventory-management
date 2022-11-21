import { Link } from "react-router-dom";
import { Button, TextField } from "../../components";
import TableReceipt from "../receipt/TableReceipt";

const TransactionTable = () => {
  return (
    <div>
      <div className="flex pt-3 pb-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          alt=""
          width="20px"
          height="20px"
        />
        <span> / </span>
        <p>
          <a href="" className="hover:text-blue-500">
            Kho hàng
          </a>
        </p>
        <span> / </span>
        <p>
          <a href="" className="hover:text-blue-500">
            xuất nhập kho
          </a>
        </p>
      </div>

      <div className="flex p-3">
        <div className="w-2/12 border-blue-500	border-t-2">
          <p>Phiếu xuất nhập kho</p>
        </div>
        <div className="w-10/12">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Sản phẩm xuất nhập kho"
          />
        </div>
      </div>

      <div className="mb-3 flex">
        <TextField name="" placeholder="ID" />
        {/* <input
        className="shadow appearance-none border rounded w-1/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="ID"
      /> */}

        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3"
        >
          <option selected>Loại</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>

        {/* <input
        className="shadow appearance-none border rounded w-2/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-3"
        type="date"
      /> */}
        <TextField name="" type="date" className="ml-3" />
        <TextField name="" type="date" className="ml-3" />

        <div className="w-1/12 flex ml-3">
          <button className="w-1/2 bg-emerald-400 flex items-center justify-center">
            Lọc
          </button>
        </div>
      </div>
      <div className="mt-3 mb-3 flex">
        <Link
          to="/export_shipment"
          className="focus-visible:outline-2 focus-visible:outline-orange-secondary px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium max-w-fit bg-green-500"
        >
          Thêm Mới
        </Link>
      </div>

      <div className="w-full">
        <div className="w-full">
          <TableReceipt />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
