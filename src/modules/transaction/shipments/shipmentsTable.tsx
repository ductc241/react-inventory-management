import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listShipments } from "../../../api/shipments";
import { list } from "../../../api/supplier.api";
import { Select, Table } from "../../../components";
import { Caret } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";
import IOption from "../../../types/option.model";
import { isAuthenticated } from "../../../utils/localStorage/localStorega";

const ShipmentsTable = () => {
  const [valueSelect, setValueSelect] = useState<IOption[]>([]);
  const [optionValue, setOptionValue] = useState<IOption>();
  const [data, setData] = useState([]);

  const getShipmentData = async () => {
    const { data } = await listShipments();
    setData(data.data);
  };

  const getSupplier = async () => {
    const res = await list();
    setValueSelect(res.data);
  };

  const dataFilter: { value: ""; label: "" }[] = valueSelect?.map(
    (item: any) => ({
      value: item.id,
      label: item.name
    })
  );

  const dataSource = data.filter((item: any) =>
    item.supplier_name
      .toLowerCase()
      .includes(optionValue?.label?.toLocaleString().toLowerCase())
  );

  useEffect(() => {
    getShipmentData();
    getSupplier();
  }, []);

  const columns: ITableColumn[] = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      key: 1
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier_name",
      key: 2
    },
    {
      title: "Thời gian",
      dataIndex: "import_date",
      key: 3
    },
    {
      title: "Tổng số tiền nhập hàng",
      dataIndex: "import_price_totail",
      key: 4,
      render: ({ import_price_totail }) => (
        <span>
          {new Intl.NumberFormat("de-DE").format(import_price_totail)} VND
        </span>
      )
    },
    {
      title: "Mã lô hàng",
      dataIndex: "import_code",
      key: 5
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: 6,
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

  const user = isAuthenticated();

  return (
    <div>
      <div className="flex justify-between mb-5">
        {dataFilter && dataFilter.length !== 0 && (
          <Select
            className="w-96"
            options={dataFilter}
            handleClickChange={(data) => setOptionValue(data)}
            option={optionValue}
          />
        )}
        {user.role_id === 1 ? (
          <Link to="/import_shipments/add">
            <div className=" bg-green-500 hover:bg-green-600 px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium">
              Tạo Phiếu
            </div>
          </Link>
        ) : (
          <div
            onClick={() => {
              toast.error(
                "ạn không phải là chủ cửa hàng nên ko thể tọa phiếu nhập"
              );
            }}
            className=" bg-green-500 hover:bg-green-600 px-6 py-[12px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium"
          >
            Tạo Phiếu
          </div>
        )}
      </div>
      <div>
        <Table
          column={columns}
          dataSource={dataSource.length !== 0 ? dataSource : data}
          linkUrl={location.href.split("/")[3]}
        />
        <ReactPaginate
          pageCount={10}
          containerClassName="pagination mt-5"
          pageClassName="pagination_item"
          activeClassName="pagination_active"
          previousLabel={<Caret width={"15px"} />}
          nextLabel={<Caret className="rotate-180" width={"15px"} />}
        />
      </div>
    </div>
  );
};

export default ShipmentsTable;
