import { useState } from "react";
import { Link } from "react-router-dom";
import { Select, Table } from "../../../components";
import { ITableColumn } from "../../../components/Table/Table.types";
import IOption from "../../../types/option.model";
import { BrandOptions } from "../../product/ProductForm/ProductForm.constants";

const ShipmentsTable = () => {
  const [valueSelect, setValueSelect] = useState<IOption>();
  const columns: ITableColumn[] = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Thời gian",
      dataIndex: "time_import",
      key: "item_import"
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier"
    },
    {
      title: "Nhà cung cấp cần trả",
      dataIndex: "supplier_pay",
      key: "supplier_pay"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: ({ status }) => {
        return (
          <>
            {status === true ? (
              <div className="text-green-500">Đã thanh toán</div>
            ) : (
              <div className="text-red-500">Chưa thanh toán</div>
            )}
          </>
        );
      }
    }
  ];

  const dataSource = [
    {
      id: "1",
      time_import: "20/10/2022",
      supplier: "VietTel",
      supplier_pay: "19000000",
      status: true
    },
    {
      id: "2",
      time_import: "20/10/2022",
      supplier: "VietTel",
      supplier_pay: "19000000",
      status: false
    },
    {
      id: "3",
      time_import: "20/10/2022",
      supplier: "VietTel",
      supplier_pay: "19000000",
      status: false
    },
    {
      id: "4",
      time_import: "20/10/2022",
      supplier: "VietTel",
      supplier_pay: "19000000",
      status: true
    },
    {
      id: "5",
      time_import: "20/10/2022",
      supplier: "VietTel",
      supplier_pay: "19000000",
      status: true
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Select
          className="w-96"
          options={BrandOptions}
          handleClickChange={(data) => setValueSelect(data)}
          option={valueSelect}
        />
        <Link to="/import_shipments/add">
          <div className="bg-green-500 hover:bg-green-600 px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium">
            Tạo Phiếu
          </div>
        </Link>
      </div>
      <div>
        <Table column={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default ShipmentsTable;
