import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Select, Table } from "../../../components";
import { TrashIcon } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import { getShipmentThunk } from "../../../store/slice/shipments";
import IOption from "../../../types/option.model";
import { BrandOptions } from "../../product/ProductForm/ProductForm.constants";

const ShipmentsTable = () => {
  const [valueSelect, setValueSelect] = useState<IOption>();
  const useSelector = useAppSelector;
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { shipments } = useSelector((store) => store.shipment);

  useEffect(() => {
    useDispatch(getShipmentThunk());
  }, [useDispatch]);

  const columns: ITableColumn[] = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      key: 1
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplierId",
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
      title: "Tên sản phẩm",
      dataIndex: "productId",
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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 7,
      render: ({ id }) => (
        <div className="flex justify-start">
          {/* <EyesIcon
            className="cursor-pointer fill-green-400 hover:fill-green-600"
            width={22}
          />
          <EditIcon
            className="cursor-pointer fill-blue-400 hover:fill-blue-600"
            width={20}
            onClick={() => navigate(`update/${id}`)}
          /> */}
          <TrashIcon
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
          />
        </div>
      )
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
        <Table column={columns} dataSource={shipments} />
      </div>
    </div>
  );
};

export default ShipmentsTable;
