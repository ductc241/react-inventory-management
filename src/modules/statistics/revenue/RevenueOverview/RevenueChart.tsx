import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from "chart.js";
import moment from "moment";
import { Line } from "react-chartjs-2";
import ChartOption from "../../../../types/chart.option";
import { numberWithCommas } from "../../../../utils/funtion";

interface IProps {
  staticalData: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const RevenueChart = ({ staticalData }: IProps) => {
  const data = {
    labels: [...Array(moment().daysInMonth())].map((_, i) => i + 1),
    datasets: [
      {
        label: "Lãi: ",
        data: [null, 27, 76, null, 53, 48, 116],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  return (
    <div className="w-2/3 rounded-md shadow-custom">
      <div className="grid grid-cols-12 gap-5 p-5 border-b bg-gray-100">
        <div className="col-span-3 bg-white py-4 text-center border border-gray-300">
          <div className="mb-5">
            <p className="uppercase font-semibold">Hôm qua</p>
          </div>
          <p>{numberWithCommas(staticalData.sales_money_in_yesterday)} VNĐ</p>
        </div>
        <div className="col-span-3 bg-green-500 py-4 text-center border border-gray-300  text-white">
          <div className="mb-5">
            <p className="uppercase font-semibold">Hôm nay</p>
          </div>
          <p>{numberWithCommas(staticalData.sales_money_in_now)} VNĐ</p>
        </div>
        <div className="col-span-3 bg-white py-4 text-center border border-gray-300">
          <div className="mb-5">
            <p className="uppercase font-semibold">Tuần qua</p>
          </div>
          <p>{numberWithCommas(staticalData.sales_money_in_day_ofWeek)} VNĐ</p>
        </div>
        <div className="col-span-3 bg-white py-4 text-center border border-gray-300">
          <div className="mb-5">
            <p className="uppercase font-semibold">Tổng</p>
          </div>
          <p>{numberWithCommas(staticalData.funds)} VNĐ</p>
        </div>
      </div>
      <div className="px-5 py-10 h-[400px]">
        <Line options={ChartOption} data={data} />;
      </div>
    </div>
  );
};

export default RevenueChart;
