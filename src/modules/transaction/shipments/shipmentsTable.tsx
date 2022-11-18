import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Modal, Select, Table } from "../../../components";
import { Caret, TrashIcon } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import {
  deleteShipmentsThunk,
  getShipmentThunk
} from "../../../store/slice/shipments";
import IOption from "../../../types/option.model";
import { BrandOptions } from "../../product/ProductForm/ProductForm.constants";

const ShipmentsTable = () => {
  const [valueSelect, setValueSelect] = useState<IOption>();
  const useSelector = useAppSelector;
  const useDispatch = useAppDispatch();
  const { shipments } = useSelector((store) => store.shipment);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const handleConfirm = () => {
    if (idDelete !== 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDispatch(deleteShipmentsThunk(+idDelete));
    }
    setOpen(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDispatch(getShipmentThunk());
  }, [idDelete, useDispatch]);

  const handleDelete = (id: any) => {
    setOpen(true);
    setIdDelete(id);
  };

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
          <TrashIcon
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
            onClick={() => handleDelete(id)}
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
      <Modal
        visible={open}
        title="Xoá phiếu nhập"
        onCancel={() => setOpen(false)}
        onOk={() => handleConfirm()}
      />
      <div>
        <Table column={columns} dataSource={shipments} />
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
