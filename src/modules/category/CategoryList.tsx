import { Table } from "../../components";
import ReactPaginate from "react-paginate";
import { Caret, EditIcon, EyesIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";

const dataSource = [
  {
    key: "1",
    code: "Nhom01",
    name: "	Củ sạc"
  },
  {
    key: "2",
    code: "Nhom02",
    name: "	Tai nghe"
  },
  {
    key: "3",
    code: "Nhom03",
    name: "	Dây sạc"
  }
];

const columns: ITableColumn[] = [
  {
    key: 1,
    title: "Mã nhóm hàng",
    dataIndex: "code"
  },
  {
    key: 2,
    title: "Tên nhóm hàng",
    dataIndex: "name"
  },
  {
    key: 3,
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="flex gap-x-5">
        <EyesIcon
          className="cursor-pointer fill-green-400 hover:fill-green-600"
          width={22}
        />
        <EditIcon
          className="cursor-pointer fill-blue-400 hover:fill-blue-600"
          width={20}
        />
        <TrashIcon
          className="cursor-pointer fill-red-400 hover:fill-red-600"
          width={20}
        />
      </div>
    )
  }
];

const CategoryList = () => {
  return (
    <>
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

export default CategoryList;
