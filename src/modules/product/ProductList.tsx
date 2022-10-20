import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { Table, Modal } from "../../components";
import { Caret, EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";

const dataSource = [
  {
    key: "1",
    code: "SP0001",
    name: "	Cáp IPhone 2M Microcom",
    price: 70000,
    price_cost: 25000,
    quantity: 20
  },
  {
    key: "2",
    code: "SP0001",
    name: "	Cáp IPhone 2M Microcom",
    price: 70000,
    price_cost: 25000,
    quantity: 20
  },
  {
    key: "3",
    code: "SP0001",
    name: "	Cáp IPhone 2M Microcom",
    price: 70000,
    price_cost: 25000,
    quantity: 20
  }
];

const columns: ITableColumn[] = [
  {
    key: 1,
    title: "Mã hàng",
    dataIndex: "code"
  },
  {
    key: 2,
    title: "Tên hàng",
    dataIndex: "name"
  },
  {
    key: 3,
    title: "Giá bán",
    dataIndex: "price"
  },
  {
    key: 4,
    title: "Giá vốn",
    dataIndex: "price_cost"
  },
  {
    key: 5,
    title: "Tồn kho",
    dataIndex: "quantity"
  },
  {
    key: 6,
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="flex gap-x-5">
        <Link to="/products/update/1">
          <EditIcon
            className="cursor-pointer fill-green-400 hover:fill-green-600"
            width={22}
          />
        </Link>
        <TrashIcon
          className="cursor-pointer fill-red-400 hover:fill-red-600"
          width={20}
        />
      </div>
    )
  }
];

const ProductList = () => {
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

      <Modal
        visible={false}
        title="Xác nhận"
        content="Bạn có muốn ẩn sản phẩm này không ?"
      />
    </>
  );
};

export default ProductList;
