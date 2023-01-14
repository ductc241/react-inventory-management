import { useState } from "react";
import { Button, TextField } from "../../../../components";

const FilterSearchBar = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [productKey, setProductKey] = useState<string>("");
  const [productId, setproductId] = useState<number>(0);

  return (
    <div className="flex justify-between items-center">
      <p className="text-xl uppercase">Báo cáo doanh thu theo nhà cung cấp</p>
      <div className="flex flex-row gap-10">
        <div className="flex">
          <TextField
            type="date"
            name="date-end"
            className="rounded-r-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            name="date"
            className="rounded-l-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <TextField
            name="product_name"
            placeholder="Nhà cung cấp"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
          />
        </div>
        <Button>Lọc</Button>
      </div>
    </div>
  );
};

export default FilterSearchBar;
