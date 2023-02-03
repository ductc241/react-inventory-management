import React from "react";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";

const StorageTime = () => {
  const Column: ITableColumn[] = [
    {
      key: 1,
      title: "Tên sản phẩm",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 3,
      title: "Giá bán",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Ngày xuất cuối cùng",
      dataIndex: "quantity"
    },
    {
      key: 5,
      title: "Lưu từ ngày cuối cùng",
      dataIndex: "quantity"
    }
  ];

  return (
    <>
      <p className="mb-5 text-xl font-semibold uppercase">Thời gian lưu kho</p>

      <Table column={Column} dataSource={[]} />
    </>
  );
};

export default StorageTime;
