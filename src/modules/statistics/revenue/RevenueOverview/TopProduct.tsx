import React from "react";
import { IStaticalData } from ".";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: IStaticalData;
}

const TopProduct = ({ staticalData }: IProps) => {
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Sản phẩm",
      dataIndex: "product",
      render: (record) => `${record.product.name}`
    },
    {
      key: 2,
      title: "Số lượng",
      dataIndex: "total_quantity"
    }
    // {
    //   key: 3,
    //   title: "Doanh thu",
    //   dataIndex: "price",
    //   render: (record) => `${numberWithCommas(record.total_price)}`
    // }
  ];

  return (
    <Table
      dataSource={staticalData.best_selling_products}
      column={columns}
      textAlign="left"
    />
  );
};

export default TopProduct;
