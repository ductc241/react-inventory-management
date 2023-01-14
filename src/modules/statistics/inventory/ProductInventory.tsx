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
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border" rowSpan={2}>
                Sản phẩm
              </th>
              <th className="border" rowSpan={2}>
                Tồn hiện tại
              </th>
              <th className="border py-3" colSpan={3}>
                Nhập trong kỳ
              </th>
              <th className="border py-3" colSpan={3}>
                Xuất trong kỳ
              </th>
              <th className="border py-3" colSpan={3}>
                Tồn cuối kỳ
              </th>
            </tr>
            <tr>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Giá vốn</th>
              <th className="border py-3">Thành tiền</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Giá vốn</th>
              <th className="border py-3">Thành tiền</th>
              <th className="border py-3">Số lượng</th>
              <th className="border py-3">Giá vốn</th>
              <th className="border py-3">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border">Indiana</td>
              <td className="border">Indianapolis</td>
            </tr>
            <tr>
              <td className="border">Ohio</td>
              <td className="border">Columbus</td>
            </tr>
            <tr>
              <td className="border">Michigan</td>
              <td className="border">Detroit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductInventory;
