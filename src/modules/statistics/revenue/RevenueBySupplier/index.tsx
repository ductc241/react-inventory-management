import { useEffect, useState } from "react";
import reportServices from "../../../../api/report.api";
import FilterSearchBar from "./FilterSearchBar";
import RevenueSupplier from "./RevenueSupplier";

const RevenueByInventory = () => {
  const [staticalData, setStaticalData] = useState({
    supplier_all: [],
    import_price_totail: []
  });

  useEffect(() => {
    const getRevenueByProduct = async () => {
      const { data } = await reportServices.getRevenueBySupplier({});
      setStaticalData(data);
    };

    getRevenueByProduct();
  }, []);

  return (
    <>
      <FilterSearchBar />
      <div className="mt-10">
        <RevenueSupplier staticalData={staticalData.supplier_all} />
      </div>
    </>
  );
};

export default RevenueByInventory;
