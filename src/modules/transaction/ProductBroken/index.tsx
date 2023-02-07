import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "../../../components";
import { ITableColumn } from "../../../components/Table/Table.types";

const ProductBroken = () => {
  const Columns: ITableColumn[] = [
    {
      key: 1,
      title: "Mã lô",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Tổng sản phẩm",
      dataIndex: "name"
    },
    {
      key: 3,
      title: "Tổng giá",
      dataIndex: "name"
    },
    {
      key: 4,
      title: "Ghi chú",
      dataIndex: "name"
    },
    {
      key: 5,
      title: "Hành động",
      dataIndex: "name"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <p className="text-xl font-semibold uppercase">Danh sách hàng lỗi</p>
        <Link to="/inventory/product/damaged/new">
          <Button>Thêm mới</Button>
        </Link>
      </div>

      <Table column={Columns} dataSource={[]} />
    </div>
  );
};

export default ProductBroken;
