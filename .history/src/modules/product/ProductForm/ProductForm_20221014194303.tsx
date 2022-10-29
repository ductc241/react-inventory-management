import { Button, Table } from "../../../components";
import ReactPaginate from "react-paginate";
import { Caret, EditIcon, TrashIcon } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  },
  {
    key: "3",
    name: "Dane",
    age: 16,
    address: "10 California Road"
  }
];

const columns: ITableColumn[] = [
  {
    key: 1,
    title: "Name",
    dataIndex: "name"
  },
  {
    key: 2,
    title: "Age",
    dataIndex: "age"
  },
  {
    key: 3,
    title: "Address",
    dataIndex: "address"
  },
  {
    key: 4,
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="flex gap-x-5">
        <EditIcon className="cursor-pointer" />
        <TrashIcon className="cursor-pointer" />
      </div>
    )
  }
];

const ProductForm = () => {
  return (
    <>
      <Button>Lưu</Button>
      <Button variant="warning">Lưu & Thêm mới</Button>
      <Button variant="error">Bỏ qua</Button>

      <Table dataSource={dataSource} column={columns} />

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

export default ProductForm;
