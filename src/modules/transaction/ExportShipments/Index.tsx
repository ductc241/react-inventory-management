import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import productServices from "../../../api/product.api";
import { addRecei } from "../../../api/receipt.api";
import { list } from "../../../api/supplier.api";
import { Button, Select, TextField } from "../../../components";
import IOption from "../../../types/option.model";
import { ISupplier } from "../../../types/supplier.type";
import { getDateNow } from "../../../utils/funtion";
import { getValueFromOptions } from "../../../utils/select";
import { IProduct } from "./../../../types/product.type";
import ProductPlaceholder from "../../../assets/product-placeholder.png";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { TrashIcon } from "../../../components/icons";
import EXPORT_TYPES from "./export.constants";

type Inputs = {
  export_type: string;

  exporter_name: string | null;
  exporter_phone: string | null;

  supplier: string;
  note: string;
  payment: string;
  export_date: Date;
  data: {
    quantity: number;
    price: number;
    amount: number;
    name: string;
    id: number;
    image: string;
  }[];
};

const ExportShipments = () => {
  const [product, setProduct] = useState<any>();
  const [items, setItems] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);
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

  const getDataSupplier = async () => {
    const { data } = await list();
    const array: IOption[] = data.map((item: ISupplier) => {
      return {
        label: item.name,
        value: item.id
      };
    });
    setSuplierOption(array);
  };

  useEffect(() => {
    getDataSupplier();
  }, []);

  const getProduct = async (e: string) => {
    try {
      setItems(null);
      const { data } = await productServices.getProducts();
      const getProduct: any = [];
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].name.toLowerCase().includes(e) == true && e != "") {
          getProduct.push(data.data[i]);
        }
      }

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setItem = (e: IProduct) => {
    setProduct([]);
    setItems(e);
  };

  const addPoduct = () => {
    if (fields?.length > 0) {
      let count = 0;
      for (let i = 0; i < fields.length; i++) {
        if (
          fields[i].name == items.name &&
          fields[i].price == items.price &&
          fields[i].quantity == items.quantity
        ) {
          count += 1;
        }
      }
      if (count == 0) {
        append({
          name: items.name,
          price: items.price,
          quantity: items.quantity,
          amount: 0,
          id: items.id,
          image: items.image
        });
      }
    } else {
      append({
        name: items.name,
        price: items.price,
        quantity: items.quantity,
        amount: 0,
        id: items.id,
        image: items.image
      });
    }
  };

  const onSubmit = async (formValue: Inputs) => {
    const export_product = formValue.data.map((item) => {
      return {
        id: item.id,
        quantity: item.amount,
        price: item.price,
        barcode: null
      };
    });
    const newItem = {
      products: export_product,
      // type: 1,
      export_date: getDateNow(),
      user_id: 1,
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
            handleClickChange={(type) => (
              setValue("export_type", type.value), setSupplier(type.value)
            )}
            placeholderText="-- Chọn kiểu xuất hàng --"
          />

          <Select
            selectLabel={{
              text: "Nhà cung cấp"
            }}
            options={suplierOption}
            option={getValueFromOptions(suplierOption, watch("supplier"))}
            handleClickChange={(brand) => (
              setValue("supplier", brand.value), setSupplier(brand.value)
            )}
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
          <TextField
            label="Hình thức thanh toán"
            className="mb-5"
            {...register("payment", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.payment}
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

          {items != null ? (
            <div className="flex gap-10 ">
              <TextField
                name=""
                type="text"
                onChange={(e: any) => {
                  getProduct(e.target.value);
                }}
                value={items?.name}
                containerClass="grow"
              />
              <Button
                onClick={() => {
                  addPoduct();
                }}
              >
                Tạo
              </Button>
            </div>
          ) : (
            <div className="flex gap-10 ">
              <TextField
                name=""
                type="text"
                onChange={(e: any) => {
                  getProduct(e.target.value);
                }}
                defaultValue={items?.name}
                containerClass="grow"
              />
              <Button
                onClick={() => {
                  addPoduct();
                }}
              >
                Tạo
              </Button>
            </div>
          )}
          {product?.length > 0 ? (
            <select
              multiple
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-5 absolute bottom-0 left-5 right-5 top-full h-max"
            >
              {product?.map((item: IProduct) => {
                return (
                  <option onClick={() => setItem(item)} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          ) : null}
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
                        <p>{item.quantity}</p>
                      </td>
                      <td className="p-5 border">
                        <TextField
                          {...register(`data.${index}.amount`)}
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
                  colSpan={4}
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
