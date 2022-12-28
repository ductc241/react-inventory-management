import { useNavigate } from "react-router-dom";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch
} from "react-hook-form";

import { Button, Select, TextField } from "../../../components";
import React, { useEffect, useState } from "react";
import {
  addShipments,
  getSuppliersApi,
  listShipments
} from "../../../api/shipments";
import { TrashIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { IProduct } from "../../../types/product.type";
import productServices from "../../../api/product.api";
import IOption from "../../../types/option.model";
import { getDateNow } from "../../../utils/funtion";
import { isAuthenticated } from "../../../utils/localStorage/localStorega";
import NotFound404 from "../../../pages/not_found/404";

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
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [showSuggestSearch, setShowSuggestSearch] = useState(false);
  const [productsSelects, setProductsSelects] = useState<any | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const [importDate, setImportDate] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [sdt, setSDT] = useState(0);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const [valueOption, setValueOption] = useState<IOption>({
    label: "Nhà cung cấp",
    value: 1
  });
  const [valueOption3, setValueOption3] = useState<IOption>({
    label: "- Chọn nhà cung cấp -",
    value: ""
  });

  const [valueOption2, setValueOption2] = useState<IOption>({
    label: "Thanh toán trực tiếp",
    value: 1
  });

  const OptionSupplier: IOption[] = [
    {
      label: "Nhà cung cấp",
      value: 1
    },
    {
      label: "Nguồn khác",
      value: 2
    }
  ];

  const OptionSupplier2: IOption[] = [
    {
      label: "Thanh toán trực tiếp",
      value: 1
    },
    {
      label: "Chuyển khoản",
      value: 2
    }
  ];

  const supplierOption = suppliersOptions?.map((item: any) => {
    return {
      label: item.name,
      value: item.id
    };
  });

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

  const handleChangeValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowSuggestSearch(true);
  };

  const matchsProduct = productsSelects?.filter((option: any) => {
    return option.name.toLowerCase().includes(search.toLowerCase());
  });

  const hanldeAddProduct = (item: IProduct) => {
    setShowSuggestSearch(false);
    setSearch("");

    if (fields?.length > 0) {
      let count = 0;
      for (let i = 0; i < fields.length; i++) {
        if (
          fields[i].name === item.name &&
          fields[i].import_price === item.price &&
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
          import_price: item.price,
          barcode: ""
        });
      }
    } else {
      prepend({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        quantity_import: 0,
        import_price: item.price,
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

  const onSubmit: SubmitHandler<Inputs> = async ({ products }: any) => {
    if (valueOption === undefined) {
      toast.warning("Bạn chưa chọn kiểu nhập hàng");
      return;
    }

    if (valueOption.value === 1) {
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
        supplier_id: valueOption3.value,
        import_date: getDateNow(),
        import_type: valueOption2.value,
        user_name: null,
        phone_number: null,
        payment: valueOption2.value,
        products: [...dataSuccsess],
        description: desc
      };

      const res = await addShipments(dataSubmit);
      if (res && res.status === 200) {
        await listShipments();
        toast.success("Nhập hàng thành công");
        navigate("/import_shipments");
      }

      if (res.status !== 200) {
        toast.error("Nhập hàng không thành công");
      }
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
        import_type: valueOption2.value,
        user_name: nameUser,
        phone_number: sdt,
        payment: valueOption2.value,
        products: [...dataSuccsess],
        description: desc
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await addShipments(dataSubmit);
      if (res && res.status === 200) {
        await listShipments();
        toast.success("Nhập hàng thành công");
        navigate("/import_shipments");
      }

      if (res.status !== 200) {
        toast.error("Nhập hàng không thành công");
      }
    }
  };
  const user = isAuthenticated();
  return (
    <>
      {user.role_id === 1 ? (
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
                <Select
                  selectLabel={{
                    text: "Kiểu nhập hàng"
                  }}
                  options={OptionSupplier}
                  option={valueOption}
                  handleClickChange={(e) => setValueOption(e)}
                />
                {valueOption.value === 1 ? (
                  <div className="my-3">
                    <Select
                      selectLabel={{
                        text: "Nhà cung cấp"
                      }}
                      options={supplierOption}
                      option={valueOption3}
                      handleClickChange={(e) => setValueOption3(e)}
                      placeholderText="- Chọn nhà cung cấp -"
                    />
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
                  </div>
                )}
              </div>
              <div>
                <p className="mb-1">Ghi chú</p>
                <textarea
                  className="w-full border-2 h-[80px] border-[#DEDEDE] rounded-lg outline-none p-2"
                  onChange={(e) => setDesc(e.target.value)}
                >
                  {desc}
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-span-1 shadow-md rounded-lg h-max">
            <div className="border-b p-5">
              <p>Thanh toán</p>
            </div>
            <div className="p-5">
              <div className="mb-3">
                <Select
                  selectLabel={{
                    text: "Kiểu thanh toán"
                  }}
                  options={OptionSupplier2}
                  option={valueOption2}
                  handleClickChange={(e) => setValueOption2(e)}
                />
              </div>
              <TextField
                name="ngày thanh toán"
                label="Ngày hẹn thanh toán"
                type="date"
                value={importDate}
                onChange={(e) => setImportDate(e.target.value)}
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
                              {...register(
                                `products.${index}.quantity_import`,
                                {
                                  valueAsNumber: true
                                }
                              )}
                              type="number"
                              className="border"
                            />
                          </td>
                          <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                            <TextField
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
              {control && <TotalAmout control={control} />} VND
            </span>
          </div>
          <div className="">
            <Button className="py-4 text-base" type="submit">
              Nhập hàng
            </Button>
          </div>
        </form>
      ) : (
        <NotFound404 />
      )}
    </>
  );
};

export default ShipMentsForm;
