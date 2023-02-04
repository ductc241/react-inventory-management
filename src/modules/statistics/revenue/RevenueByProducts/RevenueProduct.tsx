import { useEffect, useState } from "react";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: any[];
}

const RevenueProduct = ({ staticalData }: IProps) => {
  const [profit, setProfit] = useState<number>(0);
  const [totalExport, setTotalExport] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Sản phẩm",
      dataIndex: "name",
      render: (record) => `${record.product.name}`
    },
    {
      key: 2,
      title: "Giá bán",
      dataIndex: "price",
      render: (record) => `${numberWithCommas(record.product.price)}`
    },
    {
      key: 3,
      title: "Tổng lô",
      dataIndex: "totail_order"
    },
    {
      key: 4,
      title: "Tổng bán",
      dataIndex: "quantity"
    },
    {
      key: 5,
      title: "Doanh thu",
      dataIndex: "price",
      render: (record) => <p>{numberWithCommas(record.total_price)}</p>
    },
    {
      key: 6,
      title: "Lợi nhuận",
      dataIndex: "total_price",
      render: (record) => <p>{numberWithCommas(record.profit)}</p>
    }
  ];

  useEffect(() => {
    const profit = staticalData.reduce((total, item) => {
      return total + item.profit;
    }, 0);
    const revenue = staticalData.reduce((total, item) => {
      return total + item.total_price;
    }, 0);
    const total = staticalData.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);

    setTotalRevenue(revenue);
    setProfit(profit);
    setTotalExport(total);
  }, [staticalData]);

  return (
    <>
      <div className="grid grid-cols-12 gap-10 mb-10">
        <div className="col-span-4 border bg-white">
          <div className="py-3 px-4 bg-gray-100">
            <p className="text-lg font-semibold">Tổng bán</p>
          </div>

          <div className="py-3 px-4">
            <div className="flex justify-between mb-3">
              <p>Số lượng</p>
              <p>{totalExport}</p>
            </div>
            <div className="flex justify-between">
              <p>Doanh thu</p>
              <p>{numberWithCommas(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="col-span-4 border bg-white">
          <div className="py-3 px-4 bg-gray-100">
            <p className="text-lg font-semibold">Doanh thu</p>
          </div>

          <div className="py-3 px-4">
            <div className="flex justify-between mb-3">
              <p>Tổng</p>
              <p>{numberWithCommas(totalRevenue)}</p>
            </div>
            <div className="flex justify-between">
              <p>Lợi nhuận</p>
              <p>{numberWithCommas(profit)}</p>
            </div>
          </div>
        </div>
      </div>

      <Table dataSource={staticalData} column={columns} textAlign="left" />
    </>
  );
};

export default RevenueProduct;
