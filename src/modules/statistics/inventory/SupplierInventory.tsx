import moment from "moment";
import React, { useEffect, useState } from "react";
import reportServices from "../../../api/report.api";
import { TextField } from "../../../components";
import { ISupplier } from "../../../types/supplier.type";
import { numberWithCommas } from "../../../utils/funtion";

interface SupplierInventory {
  beginning_inventory: number;
  ending_inventory: number;
  supplier: ISupplier;
  quantity_export: string;
  quantity_import: string;
  superlier_quantity: number;
  supplier_import: number;
  supplier_export: number;
}

const SupplierInventory = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [productKey, setProductKey] = useState<string>("");
  const [products, setProducts] = useState<SupplierInventory[]>([]);

  useEffect(() => {
    const currentDate = moment().add(1, "days").format("YYYY-MM-DD");
    const dayThreeMonthsAgo = moment()
      .subtract(3, "month")
      .format("YYYY-MM-DD");

    setStartDate(dayThreeMonthsAgo);
    setEndDate(currentDate);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const getInitData = async () => {
      const { data } = await reportServices.getInventorySupplier({
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
          <p className="text-xl uppercase">Báo cáo tồn kho theo nhà cung cấp</p>
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
              <th className="border py-3">Tồn đầu kì</th>
              <th className="border py-3">Nhập trong kỳ</th>
              <th className="border py-3">Xuất trong kỳ</th>
              <th className="border py-3">Tồn cuối kỳ</th>
            </tr>
            <tr>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Số lượng</th>
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
                  <tr key={data.supplier.id}>
                    <td className="border py-3 text-center">
                      {data.supplier.name}
                    </td>
                    <td className="border py-3 text-center">
                      {data.superlier_quantity}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.beginning_inventory))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.supplier_import))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.supplier_export))}
                    </td>
                    <td className="border py-3 text-center">
                      {numberWithCommas(Number(data.ending_inventory))}
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

export default SupplierInventory;
