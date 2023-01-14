import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, TextField } from "../../../components";
import { IProduct } from "../../../types/product.type";

const ProductInventory = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [productKey, setProductKey] = useState<string>("");
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    const dayThreeMonthsAgo = moment()
      .subtract(3, "month")
      .format("YYYY-MM-DD");

    setStartDate(dayThreeMonthsAgo);
    setEndDate(currentDate);
  }, []);

  return (
    <>
      <div className="fillter-bar">
        <div className="flex justify-between items-center">
          <p className="text-xl uppercase">Báo cáo doanh tồn kho</p>
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
                placeholder="Sản phẩm"
                value={productKey}
                onChange={(e) => setProductKey(e.target.value)}
              />
            </div>
            <Button>Lọc</Button>
          </div>
        </div>
      </div>
      <div className="filter-tabel mt-10">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consectetur illo quam pariatur. Veniam at non sint ad explicabo ipsa
          fuga debitis quibusdam nobis accusamus exercitationem praesentium
          beatae, est eos!
        </p>
      </div>
    </>
  );
};

export default ProductInventory;
