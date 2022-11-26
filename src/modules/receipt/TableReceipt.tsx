import ReactPaginate from "react-paginate";
import { Caret } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import Table from "./TableExportShipments";

type Props = {
  data?: any;
};

type Inputs = {
  supplierCode: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  taxCode: string;
  area: string;
  group: string;
  wards: string;
  note: string;
};

const TableReceipt = (props: Props) => {
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "ID | Ngày",
      dataIndex: "id",
      render: (item: any) => (
        <>
          <p className="text-center">{item?.id}</p>
          <p className="text-center">{item?.created_at}</p>
        </>
      )
    },

    {
      key: 3,
      title: "Loại ",
      dataIndex: "",
      render: (item: any) => (
        <>
          <p>Xuất Nhà cung cấp</p>
          <p>{item?.seller_name}</p>
        </>
      )
    },

    {
      key: 5,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 6,
      title: "Tổng tiền",
      dataIndex: "totall_price",
      render: (item: any) => <p>{item?.totall_price.toLocaleString("en")}</p>
    },
    {
      key: 7,
      title: "Người tạo",
      dataIndex: "user_name"
    },
    {
      key: 8,
      title: "Ghi chú",
      dataIndex: ""
    }
  ];

  return (
    <>
      <Table dataSource={props?.data} column={columns} link={true} />
      <ReactPaginate
        pageCount={10}
        containerClassName="pagination mt-5"
        pageClassName="pagination_item"
        activeClassName="pagination_active"
        previousLabel={<Caret width={"15px"} />}
        nextLabel={<Caret className="rotate-180" width={"15px"} />}
      />
    </>
  );
};

export default TableReceipt;
