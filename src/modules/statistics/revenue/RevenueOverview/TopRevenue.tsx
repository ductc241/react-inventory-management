import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

import { IStaticalData } from ".";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { numberWithCommas } from "../../../../utils/funtion";
import { Pie } from "react-chartjs-2";

interface IProps {
  staticalData: IStaticalData;
}

ChartJS.register(Tooltip, ArcElement);

const TopRevenue = ({ staticalData }: IProps) => {
  const [labelChart, setLabelChart] = useState<string[]>(["A", "B", "C", "D"]);
  const [valueChart, setValueChart] = useState<number[]>([1, 1, 1, 1]);

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

  const chartData = {
    labels: labelChart,
    datasets: [
      {
        label: "Số lượng",
        data: valueChart,
        backgroundColor: ["#4782da", "#ff9800", "#f44336", "#e0e0e0"],
        borderColor: ["#4782da", "#ff9800", "#f44336", "#e0e0e0"],
        borderWidth: 1
      }
    ]
  };

  useEffect(() => {
    if (staticalData.most_profitable_products.length < 0) return;

    const labels = staticalData.most_profitable_products.map(
      (item) => item.product.name
    );
    const values = staticalData.most_profitable_products.map(
      (item) => item.totall_price
    );

    setLabelChart(labels);
    setValueChart(values);
  }, [staticalData]);

  return (
    <>
      <div className="w-[300px] mx-auto mb-5">
        <Pie data={chartData} />
      </div>
      <Table
        dataSource={staticalData.most_profitable_products}
        column={columns}
        textAlign="left"
      />
    </>
  );
};

export default TopRevenue;
