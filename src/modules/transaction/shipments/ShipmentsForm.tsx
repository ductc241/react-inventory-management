import { NavLink } from "react-router-dom";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch
} from "react-hook-form";

import { Button, Select, TextField } from "../../../components";
import React, { useEffect, useState } from "react";
import { getSuppliersApi } from "../../../api/shipments";
import { TrashIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { useAppDispatch } from "../../../hook/hook";
import { addShipmentsThunks } from "../../../store/slice/shipments";
import { IProduct } from "../../../types/product.type";
import productServices from "../../../api/product.api";
import IOption from "../../../types/option.model";
import { getDateNow } from "../../../utils/funtion";

type Inputs = {
  supplier_id: number;
  products: {
    id: number;
    quantity: number;
    quantity_import: number;
    name: string;
    import_price: number;
    barcode: string;
  }[];
};

const ShipMentsForm = () => {
  const [valueSelect, setValueSelect] = useState<any>("");
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [idSupplier, setIdSupplier] = useState(0);
  const [showSuggest, setShowSuggest] = useState(false);
  const [showSuggestSearch, setShowSuggestSearch] = useState(false);
  const [productsSelects, setProductsSelects] = useState<any | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const useDispatch = useAppDispatch();
  const [importDate, setImportDate] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [sdt, setSDT] = useState(0);

  const [valueOption, setValueOption] = useState<IOption>({
    label: "Nhà cung cấp",
    value: 1
  });

  const OptionSupplier: IOption[] = [
    { label: "Nhà cung cấp", value: 1 },
    { label: "Khác", value: 2 }
  ];

  const { handleSubmit, register, control } = useForm<Inputs>();
  const { fields, prepend, remove } = useFieldArray({
    name: "products",
    control
  });

  // Hiển thị danh sách nhà cung cấp
  useEffect(() => {
    const getSuppliers = async () => {
      const { data } = await getSuppliersApi();
      setSuppliersOptions(data);
    };
    getSuppliers();
  }, []);

  // Call API theo nhà cung cấp
  useEffect(() => {
    const getShipemnteProductsAPI = async () => {
      const { data } = await productServices.getProducts();
      setProductsSelects(data.data);
    };
    getShipemnteProductsAPI();
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelect(e.target.value);
    setShowSuggest(true);
  };

  const handleChangeValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowSuggestSearch(true);
  };

  const matchs = suppliersOptions?.filter((option: any) => {
    return option.name.toLowerCase().includes(valueSelect.toLowerCase());
  });

  const matchsProduct = productsSelects?.filter((option: any) => {
    return option.name.toLowerCase().includes(search.toLowerCase());
  });

  const hanldeClick = (item: any) => {
    setIdSupplier(item.id);
    setValueSelect(item.name);
    setShowSuggest(false);
  };

  const hanldeAddProduct = (item: IProduct) => {
    setShowSuggestSearch(false);
    setSearch("");
    if (fields?.length > 0) {
      let count = 0;
      for (let i = 0; i < fields.length; i++) {
        if (
          fields[i].name === item.name &&
          fields[i].import_price === item.import_price &&
          fields[i].quantity === item.quantity
        ) {
          toast.warning("Sản phẩm đã có trong danh sách");
          // eslint-disable-next-line no-plusplus
          count++;
        }
      }
      if (count === 0) {
        prepend({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          quantity_import: 0,
          import_price: item.import_price,
          barcode: ""
        });
      }
    } else {
      prepend({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        quantity_import: 0,
        import_price: item.import_price,
        barcode: ""
      });
    }
  };

  const TotalAmout = ({ control }: { control: Control<Inputs> }) => {
    const totalShipments = useWatch({
      control,
      name: "products"
    });
    let totalArr = 0;

    if (totalShipments !== undefined) {
      totalArr = totalShipments.reduce(
        (a, b) =>
          a +
          (Number.isNaN(b.quantity_import) ? 0 : b.quantity_import) *
            (Number.isNaN(b.import_price) ? 0 : b.import_price),
        0
      );
    }

    return (
      <p>
        <strong className="mx-2">{<FormatNumber number={totalArr} />}</strong>
      </p>
    );
  };

  const onSubmit: SubmitHandler<Inputs> = ({ products }: any) => {
    if (+valueOption.value === 1) {
      if (+idSupplier === 0) {
        toast.warning("Bạn chưa chọn nhà cung cấp");
        return;
      }

      const dataSuccsess = products?.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity_import,
        import_price: item.import_price,
        barcode: item.barcode
      }));

      if (dataSuccsess.length === 0) {
        toast.warning("Bạn chưa nhập sẩn phẩm nào");
        return;
      }

      const dataSubmit = {
        supplier_id: +idSupplier,
        import_date: getDateNow(),
        import_type: valueOption.value === 1 ? valueOption.value : null,
        user_name: null,
        phone_number: null,
        payment: 1,
        products: [...dataSuccsess]
      };

      console.log(dataSubmit);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDispatch(addShipmentsThunks(dataSubmit));
      // toast.success("Tạo phiếu nhập hàng thành công");
      return;
    }

    if (+valueOption.value === 2) {
      const dataSuccsess = products?.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity_import,
        import_price: item.import_price,
        barcode: item.barcode
      }));

      if (dataSuccsess.length === 0) {
        toast.warning("Bạn chưa nhập sẩn phẩm nào");
        return;
      }

      const dataSubmit = {
        supplier_id: null,
        import_date: getDateNow(),
        import_type: valueOption.value === 2 ? valueOption.value : null,
        user_name: nameUser,
        phone_number: `${sdt}`,
        payment: 1,
        products: [...dataSuccsess]
      };

      console.log(dataSubmit);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDispatch(addShipmentsThunks(dataSubmit));
      // toast.success("Tạo phiếu nhập hàng thành công");
      return;
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-2 gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1 shadow-md rounded-lg">
          <div className="border-b p-5">
            <p>Thông tin</p>
          </div>
          <div className="p-5">
            <div>
              <p className="pb-1">Loại</p>
              <Select
                options={OptionSupplier}
                option={valueOption}
                handleClickChange={(e) => setValueOption(e)}
              />
              {valueOption.value === 1 ? (
                <div className="relative w-full">
                  <p className="pb-1 pt-3">Nhà cung cấp</p>
                  <input
                    value={valueSelect}
                    placeholder="Tìm kiếm nhà cung cấp..."
                    onChange={handleChangeValue}
                    name="supplior"
                    autoComplete="off"
                    className="w-full h-10 rounded-md mb-3 p-5 border"
                  />
                  {showSuggest && valueSelect !== "" && (
                    <ul className="mt-1 rounded-md z-50 absolute w-full cursor-pointer border bg-white">
                      {matchs.map((item: any, key) => {
                        return (
                          <li
                            key={key}
                            onClick={() => hanldeClick(item)}
                            className="hover:bg-gray-200 w-full h-10 flex items-center p-5"
                          >
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                  <TextField
                    label="Khách hàng"
                    name="Khách hàng"
                    className="my-2"
                    value={nameUser}
                    onChange={(e) => setNameUser(e.target.value)}
                  />
                  <TextField
                    label="Số điện thoại"
                    name="Số điện thoại"
                    type="number"
                    className="mb-2"
                    onChange={(e) =>
                      setSDT(e.target.value as unknown as number)
                    }
                  />
                  {/* setSDT(e.target.value) */}
                </div>
              )}
            </div>
            <div>
              <p className="mb-1">Ghi chú</p>
              <textarea className="w-full border-2 h-[80px] border-[#DEDEDE] rounded-lg outline-none p-2"></textarea>
            </div>
          </div>
        </div>
        <div className="col-span-1 shadow-md rounded-lg h-max">
          <div className="border-b p-5">
            <p>Thanh toán</p>
          </div>
          <div className="p-5">
            <TextField
              name="Kiểu thanh toán"
              label="kiểu thanh toán"
              className="mb-5"
            />
            <TextField
              name="ngày thanh toán"
              label="Ngày hẹn thanh toán"
              type="date"
              value={importDate}
              onChange={(e) => setImportDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-span-2 flex border h-10 px-5 w-full">
          <div className="w-[7%] font-semibold text-[15px] flex items-center h-full border-r-2 pr-1">
            Sản phẩm:
          </div>
          <div className="w-[90%] relative">
            <input
              className="w-full h-full px-2 border-none focus:outline-none"
              placeholder="Tìm kiếm sản phẩm ..."
              value={search}
              onChange={(e) => handleChangeValueSearch(e)}
            />
            {showSuggestSearch && search !== "" && (
              <ul className="mt-1 rounded-md z-50 absolute w-full cursor-pointer border bg-white">
                {matchsProduct.map((item: any) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => hanldeAddProduct(item)}
                      className="hover:bg-gray-200 w-full h-10 flex items-center p-2"
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-5">
            <table className="w-full table border">
              <thead className="text-left">
                <tr className="bg-gray-100">
                  <th
                    scope="col"
                    className="p-[14px] first:pl-[24px] last:pr-[24px] leading-[27px] text-[#311339] text-[14px] font-bold uppercase"
                  >
                    Tên sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="p-[14px] first:pl-[24px] last:pr-[24px] leading-[27px] text-[#311339] text-[14px] font-bold uppercase"
                  >
                    Số lượng / Kho
                  </th>
                  <th
                    scope="col"
                    className="p-[14px] first:pl-[24px] last:pr-[24px] leading-[27px] text-[#311339] text-[14px] font-bold uppercase"
                  >
                    Số lượng / Nhập
                  </th>
                  <th
                    scope="col"
                    className="p-[14px] first:pl-[24px] last:pr-[24px] leading-[27px] text-[#311339] text-[14px] font-bold uppercase"
                  >
                    Giá nhập/ 1 SP
                  </th>
                  <th
                    scope="col"
                    className="p-[14px] first:pl-[24px] last:pr-[24px] leading-[27px] text-[#311339] text-[14px] font-bold uppercase"
                  >
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.length !== 0 ? (
                  fields?.map((field, index) => {
                    return (
                      <tr
                        key={field.id}
                        className="border-b border-gray-200 text-lg leading-[27px] text-[#311339] hover:bg-emerald-50"
                      >
                        <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                          <TextField
                            disabled
                            {...register(`products.${index}.name`)}
                            className="border-none"
                          />
                        </td>
                        <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                          <TextField
                            disabled
                            {...register(`products.${index}.quantity`, {
                              valueAsNumber: true
                            })}
                            type="number"
                            className="border"
                          />
                        </td>
                        <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                          <TextField
                            {...register(`products.${index}.quantity_import`, {
                              valueAsNumber: true
                            })}
                            type="number"
                            className="border"
                          />
                        </td>
                        <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                          <TextField
                            disabled
                            {...register(`products.${index}.import_price`, {
                              valueAsNumber: true
                            })}
                            type="number"
                            className="border"
                          />
                        </td>
                        <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                          <div
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <TrashIcon
                              className="cursor-pointer fill-red-400 hover:fill-red-600"
                              width={20}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="font-medium py-20 text-center">
                      Chưa có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <span className="flex justify-end text-lg">
            Tổng số tiền nhập hàng:
            {control && <TotalAmout control={control} />}
          </span>
        </div>
        <div className="">
          <Button className="py-4 text-base" type="submit">
            Nhập hàng
          </Button>
        </div>
      </form>
    </>
  );
};

export default ShipMentsForm;
