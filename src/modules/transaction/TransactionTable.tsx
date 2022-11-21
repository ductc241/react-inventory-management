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
      <form>
        <div className="mb-3 flex">
          <TextField name="" placeholder="ID" />

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

          <div className="ml-3">
            <TextField name="" type="date" />
          </div>
          <div className="ml-3">
            <TextField name="" type="date" />
          </div>

          <Button className="ml-3">Lọc</Button>
        </div>
      </form>
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
