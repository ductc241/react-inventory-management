import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listRecei } from "../../api/receipt.api";
import { listShipments } from "../../api/shipments";
import { Button, TextField } from "../../components";
import { isAuthenticated } from "../../utils/localStorage/localStorega";
import TableReceipt from "../receipt/TableReceipt";

const TransactionTable = () => {
  const [data, setData] = useState<any>([]);
  const [dataImprortShipment, setDataImprotShipments] = useState<any>([]);
  const [messenger, setMessenger] = useState<string>();
  const getReceipt = async () => {
    try {
      const { data } = await listRecei();
      const { data: improtShipment } = await listShipments();
      setDataImprotShipments(improtShipment.data);
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
    const countries: any = document.getElementById("countries");

    if (
      id.value &&
      !import_Date.value &&
      !export_date.value &&
      countries.value == "Loại"
    ) {
      const datas: any = [];
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id == Number(id.value)) {
          datas.push(data.data[i]);
        }
      }
      setData(datas);
    }
    if (
      !id.value &&
      import_Date.value &&
      export_date.value &&
      countries.value == "Loại"
    ) {
      const datas: any = [];
      const startDate: any = Date.parse(import_Date.value);
      const endDate: any = Date.parse(export_date.value);
      if (startDate > endDate) {
        setMessenger("ngày kết thúc phải lớn hơn ngày bắt đầu");
      } else {
        const { data: datass } = await listRecei();
        for (let i = 0; i < datass.data.length; i++) {
          const shortDate_2: any = new Date(
            `${datass.data[i].created_at.split("/")[1]}/${
              datass.data[i].created_at.split("/")[0]
            }/${datass.data[i].created_at.split("/")[2]}`
          );

          const date = Date.parse(shortDate_2);
          if (date > startDate && date < endDate) {
            datas.push(data.data[i]);
          }
        }
        setData(datas);
      }
    }

    if (
      (id.value && import_Date.value) ||
      (id.value && export_date.value) ||
      (countries.value != "Loại" && id.value) ||
      (countries.value != "Loại" && import_Date.value && !export_date.value) ||
      (countries.value != "Loại" && export_date.value && !import_Date.value)
    ) {
      setMessenger("Không Lọc được  ");
    }

    if (
      !id.value &&
      !import_Date.value &&
      !export_date.value &&
      countries.value == "Loại"
    ) {
      setData(data.data);
      setMessenger("");
    }

    if (!id.value && countries.value != "Loại" && import_Date && export_date) {
      const datas: any = [];
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].export_type == Number(countries.value)) {
          datas.push(data.data[i]);
        }
      }
      setData(datas);
    }
    id.value = "";
    import_Date.value = "";
    export_date.value = "";
  };

  const user = isAuthenticated();

  return (
    <div>
      <div className="mb-3 flex">
        <TextField type="number" placeholder="ID" name="id" id="id" />

        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/12 p-2.5 ml-3"
        >
          <option selected>Loại</option>
          <option value="1">Phiếu nhập</option>
          <option value="2">Phiếu xuất</option>
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
        {user.role_id === 1 ? (
          <Link
            to="/export_shipment"
            className="focus-visible:outline-2 focus-visible:outline-orange-secondary px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium max-w-fit bg-green-500"
          >
            Thêm Mới
          </Link>
        ) : (
          <div
            onClick={() => {
              toast.error("bạn không có quyền thêm");
            }}
            className="focus-visible:outline-2 focus-visible:outline-orange-secondary px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium max-w-fit bg-green-500"
          >
            Thêm Mới
          </div>
        )}
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
