import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { TrashIcon } from "../../../components/icons";
import { Button, Select, TextField } from "../../../components";
import ProductPlaceholder from "../../../assets/product-placeholder.png";

import productServices from "../../../api/product.api";
import { addRecei, exportShipmentsDetail } from "../../../api/receipt.api";
import * as supplierServices from "../../../api/supplier.api";
import {
  convertDataToOption,
  convertDataToOptionShipments,
  getValueFromOptions,
  getValueFromOptionsLabel
} from "../../../utils/select";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import IOption from "../../../types/option.model";
import { IProduct } from "./../../../types/product.type";
import { EXPORT_TYPES, PAYMENT_TYPES } from "./export.constants";
import { toast } from "react-toastify";
import moment from "moment";

type Inputs = {
  export_type: number;
  user_name: string | null;
  phone_number: string | null;
  supplier: number | null;
  shipment: string;
  payment_type: number;
  export_date: Date;
  note: string;
  data: {
    product_id: number;
    name: string;
    image: string;
    inventory: number;
    price: number;
    export_price: number;
    quantity: number;
    shipment: {
      value: number;
      label: any;
    }[];
    lotCode: string;
  }[];
};

const ExportShipments = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productFilter, setProductFilter] = useState<IProduct[]>([]);
  const [suplierOption, setSuplierOption] = useState<IOption[]>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      export_type: 1,
      supplier: null,
      user_name: null,
      phone_number: null,
      payment_type: 1
    }
  });
  const { fields, append, update, remove } = useFieldArray({
    name: "data",
    control
  });

  const getInitData = async () => {
    const initData = await Promise.all([
      supplierServices.list(),
      productServices.getProducts()
    ]);

    setSuplierOption(convertDataToOption(initData[0].data));
    setProducts(initData[1].data);
  };

  const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setProductFilter([]);
      return;
    }

    const searchResult = products.filter((product) =>
      product.name.includes(e.target.value)
    );
    setProductFilter(searchResult);
    setSearch(e.target.value);
  };

  const handleAddProduct = async (item: IProduct) => {
    const { data } = await productServices.getLotCodeById(item.id);
    let count: any = 0;

    fields.map((item) => {
      if (item.product_id == data.data[0].product_id) {
        count += 1;
      }
    });

    if (count < data.data.length) {
      append({
        product_id: item.id,
        name: item.name,
        image: item.image,
        inventory: 0,
        price: 0,
        quantity: +0,
        shipment: convertDataToOptionShipments(data.data),
        lotCode: "",
        export_price: 0
      });
    }
    setProductFilter([]);
  };

  const handleChageQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    update(index, {
      ...fields[index],
      quantity: Number(e.target.value)
    });
  };

  const handleUpdatefields = async (id: number, index: number) => {
    const { data } = await exportShipmentsDetail(id);

    // console.log(id, data, index, data.lot_code);
    console.log(fields);

    // const isDuplicateLotcode = fields.find((item) => Number(item.id) === id);

    // console.log(isDuplicateLotcode);

    // if (!isDuplicateLotcode) {
    //   update(index, {
    //     ...fields[index],
    //     inventory: data.quantity,
    //     price: data.import_price,
    //     lotCode: isDuplicateLotcode?.lot_code
    //   });
    // } else {
    //   toast.warning("Lô hàng bị trùng");
    // }
    // if (!isDuplicateLotcode) return;

    update(index, {
      ...fields[index],
      inventory: data.quantity,
      price: data.import_price,
      export_price: data.import_price,
      lotCode: data.lot_code
    });
  };

  const handleChagePrice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    update(index, {
      ...fields[index],
      export_price: Number(e.target.value)
    });
  };

  const onSubmit = async (formValue: Inputs) => {
    const export_product = formValue.data.map((item) => {
      return {
        id: item.product_id,
        quantity: item.quantity,
        price: item.export_price,
        lot_code: item.lotCode
      };
    });

    const export_order = {
      user_id: 1,
      export_type: formValue.export_type,
      payment: formValue.payment_type,
      products: export_product,
      supplier_id: formValue.supplier,
      user_name: formValue.user_name,
      phone_number: formValue.phone_number,
      address: null,
      description: formValue.note,
      export_date: moment(formValue.export_date, "YYYY-MM-DD")
        .subtract(1, "days")
        .format("DD/MM/YYYY"),
      receve_phone: null
    };

    try {
      await addRecei(export_order);
      toast.success("Tạo đơn thành công");
      navigate("/inventory/bill");
    } catch (error) {
      toast.error("Có lỗi xảy ra, không thể tạo đơn");
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  const totalPrice = useMemo(() => {
    const total = fields.reduce((total, product) => {
      return total + product.export_price * product.quantity;
    }, 0);

    return total;
  }, [fields]);

  return (
    <>
      <p className="mb-5 text-xl font-semibold uppercase">Phiếu xuất kho</p>

      <form
        className="grid grid-cols-2 gap-10 text-base"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1 shadow-md border-t rounded-lg">
          <div className="border-b p-5 bg-gray-50">
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
              handleClickChange={(type) => {
                setValue("export_type", type.value),
                  setValue("supplier", null),
                  setValue("user_name", null),
                  setValue("phone_number", null);
              }}
              placeholderText="-- Chọn kiểu xuất hàng --"
            />

            {watch("export_type") === 1 ? (
              <Select
                selectLabel={{
                  text: "Nhà cung cấp"
                }}
                options={suplierOption}
                option={getValueFromOptions(suplierOption, watch("supplier"))}
                handleClickChange={(brand) => setValue("supplier", brand.value)}
                placeholderText="-- Chọn nhà cung cấp --"
              />
            ) : (
              <>
                <TextField
                  label="Khách hàng"
                  {...register("user_name")}
                  containerClass="mb-5"
                />
                <TextField
                  label="Số điện thoại"
                  {...register("phone_number")}
                />
              </>
            )}

            <div className="mt-5">
              <p className="mb-1">Ghi chú</p>
              <textarea
                className="w-full border-2 h-[80px] p-4 border-[#DEDEDE] rounded-lg outline-none"
                {...register("note")}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 shadow-md border-t rounded-lg h-max">
          <div className="border-b p-5 bg-gray-50">
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
              label="Ngày thanh toán"
              type="date"
              {...register("export_date")}
              error={errors.export_date}
            />
          </div>
        </div>

        <div className="col-span-2 border-t shadow-md">
          <div className="p-5 border-b relative bg-gray-50">
            <p className="mb-3 font-semibold">Thêm Sản phẩm</p>

            <div className="flex gap-10">
              <TextField
                name="search"
                containerClass="grow"
                placeholder="Tìm kiếm"
                onChange={(e) => handleSearchProduct(e)}
                autoComplete="off"
                defaultValue={search}
              />
              <Button>Thêm sản phẩm</Button>
            </div>

            {productFilter && productFilter.length > 0 && (
              <div className="absolute left-5 right-5">
                <div className="w-1/2 bg-white border shadow-lg">
                  {productFilter.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleAddProduct(item)}
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
                  <th className="w-[200px] border text-left p-5">Sản phẩm</th>
                  <th className="w-[300px] border text-left p-5">Lô hàng</th>
                  <th className="w-[100px] border text-left p-5">Tồn kho</th>
                  <th className="w-[200px] border text-left p-5">Số lượng</th>
                  <th className="w-[300px] border p-5">Giá nhập</th>
                  <th className="w-[300px] border p-5">Giá bán</th>
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

                        <td className="p-5 flex items-center gap-5 border">
                          <img
                            src={ProductPlaceholder}
                            alt="san pham"
                            className="w-[50px] h-[50px] "
                          />
                          <p className="capitalize">{item.name}</p>
                        </td>
                        <td className="p-5 border text-center">
                          <Select
                            options={item.shipment}
                            option={getValueFromOptionsLabel(
                              item.shipment,
                              watch(`data.${index}.lotCode`)
                            )}
                            handleClickChange={(brand) => {
                              handleUpdatefields(brand.value, index);
                            }}
                            placeholderText="Chọn Lô Hàng"
                          />
                        </td>
                        <td className="p-5 border text-center">
                          <p>{item.inventory}</p>
                        </td>

                        <td className="p-5 border">
                          <TextField
                            {...register(`data.${index}.quantity`)}
                            type="number"
                            min={0}
                            max={item.inventory}
                            onChange={(e) => handleChageQuantity(e, index)}
                          />
                        </td>
                        <td className="p-5 border">
                          <TextField
                            {...register(`data.${index}.price` as const)}
                            className="text-right cursor-not-allowed"
                            disabled
                          />
                        </td>
                        <td className="p-5 border">
                          <TextField
                            {...register(`data.${index}.export_price` as const)}
                            className="text-right"
                            min={item.price}
                            onChange={(e) => handleChagePrice(e, index)}
                          />
                        </td>
                        <td className="p-5 border">
                          <p className="text-right">
                            {watch(`data.${index}.quantity`) *
                              item.export_price}
                          </p>
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
                  <td className="pr-5 border font-semibold text-right text-lg">
                    {FormatNumber({ number: totalPrice })}
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
    </>
  );
};
export default ExportShipments;
