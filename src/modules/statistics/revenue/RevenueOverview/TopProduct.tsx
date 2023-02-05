import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { IStaticalData } from ".";
import { Table } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";

interface IProps {
  staticalData: IStaticalData;
}

ChartJS.register(Tooltip, ArcElement);

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
  ];

  const [labelChart, setLabelChart] = useState<string[]>(["A", "B", "C", "D"]);
  const [valueChart, setValueChart] = useState<number[]>([1, 1, 1, 1]);

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
    if (staticalData.best_selling_products.length < 0) return;

    const labels = staticalData.best_selling_products.map(
      (item) => item.product.name
    );
    const values = staticalData.best_selling_products.map((item) =>
      Number(item.total_quantity)
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
        dataSource={staticalData.best_selling_products}
        column={columns}
        textAlign="left"
      />
    </>
  );
};

export default TopProduct;
