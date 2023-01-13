import { useEffect, useState } from "react";
import reportServices from "../../../../api/report.api";
import FilterSearchBar from "./FilterSearchBar";
import RevenueProduct from "./RevenueProduct";

const RevenueByProducts = () => {
  const [staticalData, setStaticalData] = useState([]);

  useEffect(() => {
    const getRevenueByProduct = async () => {
      const { data } = await reportServices.getRevenueByProduct({});
      setStaticalData(data);
    };

    getRevenueByProduct();
  }, []);

  return (
    <>
      <FilterSearchBar />
      <div className="mt-10">
        <RevenueProduct staticalData={staticalData} />
      </div>
    </>
  );
};

export default RevenueByProducts;
