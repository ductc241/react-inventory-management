import React from "react";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: any[];
}

const RevenueSupplier = ({ staticalData }: IProps) => {
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      render: (record) => `Nhà cung cấp ${record.supplier.id}`
    },
    {
      key: 2,
      title: "Số lượng bán ra",
      dataIndex: "quantity"
    },
    {
      key: 3,
      title: "Lợi nhuận",
      dataIndex: "total_price",
      render: (record) => `${numberWithCommas(record.total_price)}`
    }
  ];

  return <Table dataSource={staticalData} column={columns} textAlign="left" />;
};

export default RevenueSupplier;
