import moment from "moment";
import React, { useEffect, useState } from "react";
import reportServices from "../../../api/report.api";
import { Button, TextField } from "../../../components";
import { IProduct } from "../../../types/product.type";
import { numberWithCommas } from "../../../utils/funtion";

interface IProductInventory {
  beginning_inventory: number;
  ending_inventory: number;
  product: IProduct;
  quantity_export: string;
  quantity_import: string;
}

const ProductInventory = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [productKey, setProductKey] = useState<string>("");
  const [products, setProducts] = useState<IProductInventory[]>([]);

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    const dayThreeMonthsAgo = moment()
      .subtract(3, "month")
      .format("YYYY-MM-DD");

    setStartDate(dayThreeMonthsAgo);
    setEndDate(currentDate);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const getInitData = async () => {
      const { data } = await reportServices.getInventoryProduct({
        from_date: startDate,
        to_date: endDate
      });
      setProducts(data);
    };

    getInitData();
  }, [startDate, endDate]);

  return (
    <>
      <div className="fillter-bar">
        <div className="flex justify-between items-center">
          <p className="text-xl uppercase">Báo cáo tồn kho theo sản phẩm</p>
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
          </div>
        </div>
      </div>

      <div className="filter-tabel mt-10 overflow-hidden shadow-md rounded-lg border border-gray-200">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border" rowSpan={2}>
                Sản phẩm
              </th>
              <th className="border" rowSpan={2}>
                Tồn hiện tại
              </th>
              <th className="border py-3" colSpan={2}>
                Nhập trong kỳ
              </th>
              <th className="border py-3" colSpan={2}>
                Xuất trong kỳ
              </th>
              <th className="border py-3" colSpan={2}>
                Tồn cuối kỳ
              </th>
            </tr>
            <tr>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Thành tiền</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Thành tiền</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Thành tiền</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="py-32 text-center font-medium">
                  No Data
                </td>
              </tr>
            )}

            {products.length > 0 &&
              products.map((data) => {
                return (
                  <tr key={data.product.id}>
                    <td className="border py-3 text-center">
                      {data.product.name}
                    </td>
                    <td className="border py-3 text-center">
                      {data.product.quantity}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.quantity_import))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(213001)} VND
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.quantity_export))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(21300)} VND
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.ending_inventory))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(21300)} VND
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductInventory;
