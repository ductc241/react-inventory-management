import { useEffect, useState } from "react";

import TopProduct from "./TopProduct";
import RevenueChart from "./RevenueChart";
import TopRevenue from "./TopRevenue";
import reportServices from "../../../../api/report.api";
import { toast } from "react-toastify";

export interface IStaticalData {
  best_selling_products: any[];
  most_profitable_products: any[];
  funds: number;
  product_totail: number;
  sales_money_in_day_ofWeek: number;
  sales_money_in_month: any[];
  sales_money_in_now: number;
  sales_money_in_yesterday: number;
}

const Revenue = () => {
  const [staticalData, setStaticalData] = useState<IStaticalData>({
    best_selling_products: [],
    most_profitable_products: [],
    funds: 0,
    product_totail: 0,
    sales_money_in_day_ofWeek: 0,
    sales_money_in_month: [],
    sales_money_in_now: 0,
    sales_money_in_yesterday: 0
  });

  useEffect(() => {
    const getRevenueOverview = async () => {
      try {
        const { data } = await reportServices.getRevenueOverview();
        setStaticalData(data);
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng quay lại sau !!!");
      }
    };

    getRevenueOverview();
  }, []);

  return (
    <>
      <p className="mb-5 text-xl uppercase">Báo cáo doanh thu tổng quan</p>
      <RevenueChart staticalData={staticalData} />

      <div className="grid grid-cols-12 gap-10 mt-10">
        <div className="col-span-6">
          <p className="mb-5 text-lg capitalize">Top doanh thu</p>
          <TopRevenue staticalData={staticalData} />
        </div>
        <div className="col-span-6">
          <p className="mb-5 text-lg capitalize">Top sản phẩm bán nhiều nhất</p>
          <TopProduct staticalData={staticalData} />
        </div>
      </div>
    </>
  );
};

export default Revenue;
