import { Button, Table } from "../../../components";
import { ITableColumn } from "../../../components/Table/Table.types";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TransactionTable = (props: Props) => {
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
      key: "status"
    }
  ];

  const dataSource = [{}];

  return (
    <div className="border">
      <div className="flex justify-end">
        <Button>Tạo phiếu</Button>
      </div>
      <div>
        <Table column={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default TransactionTable;
