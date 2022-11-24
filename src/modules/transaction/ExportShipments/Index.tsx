import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { TrashIcon } from "../../../components/icons";
import { Button, Select, TextField } from "../../../components";
import ProductPlaceholder from "../../../assets/product-placeholder.png";

import productServices from "../../../api/product.api";
import { addRecei } from "../../../api/receipt.api";
import { list } from "../../../api/supplier.api";
import { getDateNow } from "../../../utils/funtion";
import { getValueFromOptions } from "../../../utils/select";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import IOption from "../../../types/option.model";
import { ISupplier } from "../../../types/supplier.type";
import { IProduct } from "./../../../types/product.type";
import { EXPORT_TYPES, PAYMENT_TYPES } from "./export.constants";

type Inputs = {
  export_type: string;

  exporter_name: string | null;
  exporter_phone: string | null;

  supplier: string;
  payment_type: string;
  export_date: Date;
  note: string;
  data: {
    product_id: number;
    name: string;
    image: string;
    inventory: number;
    price: number;
    quantity: number;
  }[];
};

const ExportShipments = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [suplierOption, setSuplierOption] = useState<IOption[]>([]);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    name: "data",
    control
  });

  const getInitData = async () => {
    const initData = await Promise.all([list(), productServices.getProducts()]);

    setProducts(initData[0].data);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const onSubmit = async (formValue: Inputs) => {
    const export_product = formValue.data.map((item) => {
      return {
        id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        barcode: null
      };
    });

    const newItem = {
      user_id: 1,
      products: export_product,
      export_date: getDateNow(),
      address: "HN",
      receve_phone: "1234562345"
    };
    await addRecei(newItem);
    navigate("/receipt");
  };

  return (
    <form
      className="grid grid-cols-2 gap-10 text-base"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1 shadow-md  border-t rounded-lg">
        <div className="border-b p-5">
          <p className="font-semibold">Thông tin</p>
        </div>
        <div className="p-5">
          <Select
            selectLabel={{
              text: "Kiểu xuất hàng"
            }}
            containerClass="mb-5"
            options={EXPORT_TYPES}
            option={getValueFromOptions(EXPORT_TYPES, watch("export_type"))}
            handleClickChange={(type) => setValue("export_type", type.value)}
            placeholderText="-- Chọn kiểu xuất hàng --"
          />

          <Select
            selectLabel={{
              text: "Nhà cung cấp"
            }}
            options={suplierOption}
            option={getValueFromOptions(suplierOption, watch("supplier"))}
            handleClickChange={(brand) => setValue("supplier", brand.value)}
            placeholderText="-- Chọn nhà cung cấp --"
          />

          <div className="mt-5">
            <p className="mb-1">Ghi chú</p>
            <textarea
              className="w-full border-2 h-[80px] p-4 border-[#DEDEDE] rounded-lg outline-none"
              {...register("note", {
                required: "bạn chưa nhập form này"
              })}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 shadow-md border-t rounded-lg h-max">
        <div className="border-b p-5">
          <p className="font-semibold">Thanh toán</p>
        </div>
        <div className="p-5">
          <Select
            selectLabel={{
              text: "Hình thức thanh toán"
            }}
            containerClass="mb-5"
            options={PAYMENT_TYPES}
            option={getValueFromOptions(PAYMENT_TYPES, watch("payment_type"))}
            handleClickChange={(payment) =>
              setValue("payment_type", payment.value)
            }
            placeholderText="-- Chọn hình thức --"
          />

          <TextField
            label="Ngày hẹn thanh toán"
            type="date"
            {...register("export_date", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.export_date}
          />
        </div>
      </div>

      <div className="col-span-2 border-t shadow-md">
        <div className="p-5 border-b relative">
          <p className="mb-3 font-semibold">Thêm Sản phẩm</p>

          <div className="flex gap-10">
            <TextField
              name=""
              type="text"
              containerClass="grow"
              placeholder="-- Tìm kiếm --"
            />
            <Button>Thêm sản phẩm</Button>
          </div>

          {products.length > 0 && (
            <div className="absolute left-5 right-5">
              <div className="w-1/2 bg-white border shadow-lg">
                {products.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-x-5">
                        <img src={ProductPlaceholder} className="w-[50px]" />
                        <p>{item.name}</p>
                      </div>

                      <div>
                        {item.price} VNĐ --- (Tồn: {item.quantity})
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <table className="mt-3 w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-[50px] border text-left p-5">#</th>
                <th className="border text-left p-5">Sản phẩm</th>
                <th className="w-[100px] border text-left p-5">Tồn kho</th>
                <th className="w-[200px] border text-left p-5">Số lượng</th>
                <th className="w-[300px] border p-5">Giá</th>
                <th className="w-[300px] border p-5">Thành tiền</th>
                <th className="w-[120px] border text-left p-5 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            {fields.length > 0 && (
              <tbody>
                {fields.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="p-5 border">{index}</td>

                      <td className="p-5 flex items-center gap-5">
                        <img
                          src={ProductPlaceholder}
                          alt="san pham"
                          className="w-[70px] h-[70px]"
                        />
                        <p className="text-lg capitalize">{item.name}</p>
                      </td>

                      <td className="p-5 border text-center">
                        <p>{item.inventory}</p>
                      </td>

                      <td className="p-5 border">
                        <TextField
                          {...register(`data.${index}.quantity`)}
                          type="number"
                          min={0}
                          max={item.quantity}
                        />
                      </td>
                      <td className="p-5 border">
                        <TextField
                          {...register(`data.${index}.price`)}
                          className="text-right"
                          defaultValue={item.price}
                        />
                      </td>
                      <td className="p-5 border">
                        <TextField
                          name="total-price"
                          className="text-right"
                          defaultValue={item.price * item.quantity}
                        />
                      </td>
                      <td className="border p-5 text-right">
                        <Button onClick={() => remove(index)} variant="error">
                          <TrashIcon fill="white" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            <tfoot>
              <tr>
                <td
                  className="py-5 pr-[26px] border text-right font-semibold text-lg"
                  colSpan={5}
                >
                  Tổng tiền
                </td>
                <td className="pr-[26px] border font-semibold text-right text-lg">
                  {FormatNumber({ number: 0 })} VNĐ
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-10">
            <Button type="submit" className="mt-3">
              Lưu
            </Button>
            <Button variant="warning" className="mt-3  ml-3">
              <Link to="/receipt">Hủy</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ExportShipments;
