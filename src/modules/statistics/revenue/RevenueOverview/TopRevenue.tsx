import { IStaticalData } from ".";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: IStaticalData;
}

const TopRevenue = ({ staticalData }: IProps) => {
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Sản phẩm",
      dataIndex: "sku",
      render: (record) => `${record.product.name}`
    },
    {
      key: 2,
      title: "Doanh thu",
      dataIndex: "total_price",
      render: (record) => `${numberWithCommas(record.totall_price)}`
    }
  ];

  return (
    <Table
      dataSource={staticalData.most_profitable_products}
      column={columns}
      textAlign="left"
    />
  );
};

export default TopRevenue;
