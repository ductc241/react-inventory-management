import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: any;
}

const RevenueProduct = ({ staticalData }: IProps) => {
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
      render: (record) =>
        `${numberWithCommas(record.product.price * record.quantity)}`
    },
    {
      key: 6,
      title: "Lợi nhuận",
      dataIndex: "total_price",
      render: (record) => `${numberWithCommas(record.total_price)}`
    }
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-10 mb-10">
        <div className="col-span-4 border">
          <div className="py-3 px-4 bg-gray-100">
            <p className="text-lg font-semibold">Tổng bán</p>
          </div>

          <div className="py-3 px-4">
            <div className="flex justify-between mb-3">
              <p>Số lượng</p>
              <p>{staticalData.totalProduct}</p>
            </div>
            <div className="flex justify-between">
              <p>Tổng</p>
              <p>100</p>
            </div>
          </div>
        </div>

        <div className="col-span-4 border">
          <div className="py-3 px-4 bg-gray-100">
            <p className="text-lg font-semibold">Tổng trả</p>
          </div>

          <div className="py-3 px-4">
            <div className="flex justify-between mb-3">
              <p>Số lượng</p>
              <p>0</p>
            </div>
            <div className="flex justify-between">
              <p>Tổng</p>
              <p>0</p>
            </div>
          </div>
        </div>

        <div className="col-span-4 border">
          <div className="py-3 px-4 bg-gray-100">
            <p className="text-lg font-semibold">Lợi nhuận</p>
          </div>

          <div className="py-3 px-4">
            <div className="flex justify-between mb-3">
              <p>Số lượng</p>
              <p>{staticalData.totalProduct}</p>
            </div>
            <div className="flex justify-between">
              <p>Tổng</p>
              <p>{staticalData.profit}</p>
            </div>
          </div>
        </div>
      </div>

      <Table dataSource={staticalData} column={columns} textAlign="left" />
    </>
  );
};

export default RevenueProduct;
