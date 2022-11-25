import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRecei } from "../../api/receipt.api";
import { Button, TextField } from "../../components";
import TableReceipt from "../receipt/TableReceipt";

const TransactionTable = () => {
  const [data, setData] = useState<any>([]);
  const [messenger, setMessenger] = useState<string>();
  const getReceipt = async () => {
    try {
      const { data } = await listRecei();

      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReceipt();
  }, []);

  const filter = async () => {
    const { data } = await listRecei();
    const id: any = document.getElementById("id");
    const export_date: any = document.getElementById("export_date");
    const import_Date: any = document.getElementById("import_Date");
    console.log(id, typeof export_date, import_Date);
    if (id.value && !import_Date.value && !export_date.value) {
      const datas: any = [];
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i]);
        if (data.data[i].id == Number(id.value)) {
          datas.push(data.data[i]);
        }
      }
      setData(datas);
    }
    if (!id.value && import_Date.value && export_date.value) {
      setMessenger("Lọc theo Ngày nhưng chưa lọc được");
    }
    if (id.value && import_Date.value && export_date.value) {
      setMessenger("Không Lọc được cả ID và Ngày cùng 1 Lúc");
    }

    if (!id.value && !import_Date.value && !export_date.value) {
      setData(data.data);
      setMessenger("");
    }

    id.value = "";
    import_Date.value = "";
    export_date.value = "";
  };

  return (
    <div>
      <div className="mb-3 flex">
        <TextField type="number" placeholder="ID" name="id" id="id" />

        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3"
        >
          <option selected>Loại</option>
          <option value="US">Phiếu nhập</option>
          <option value="CA">Phiếu xuất</option>
        </select>

        <div className="ml-3">
          <TextField name="import_Date" type="date" id="import_Date" />
        </div>
        <div className="ml-3">
          <TextField name="export_date" type="date" id="export_date" />
        </div>

        <Button
          className="ml-3"
          onClick={() => {
            filter();
          }}
        >
          Lọc
        </Button>
      </div>

      <span className="pt-3 pb-3">{messenger}</span>

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
          <TableReceipt data={data} />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
