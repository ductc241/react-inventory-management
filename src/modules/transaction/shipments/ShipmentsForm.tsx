import { NavLink, useNavigate } from "react-router-dom";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch
} from "react-hook-form";

import { Button, TextField } from "../../../components";
import React, { useEffect, useState } from "react";
import { getSuppliersApi } from "../../../api/shipments";
import { TrashIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { useAppDispatch } from "../../../hook/hook";
import { addShipmentsThunks } from "../../../store/slice/shipments";
import { IProduct } from "../../../types/product.type";
import productServices from "../../../api/product.api";
import { getDateNow } from "../../../utils/funtion";

type Inputs = {
  supplier_id: number;
  products: {
    id: number;
    quantity: number;
    quantity_import: number;
    name: string;
    import_price: number;
  }[];
};

const ShipMentsForm = () => {
  const [valueSelect, setValueSelect] = useState<any>("");
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [idNcc, setIdNCC] = useState(0);
  const [showSuggest, setShowSuggest] = useState(false);
  const [productsSelects, setProductsSelects] = useState<any | undefined>([]);
  const useDispatch = useAppDispatch();

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

  const matchs = suppliersOptions?.filter((option: any) => {
    return option.name.toLowerCase().includes(valueSelect.toLowerCase());
  });

  const hanldeClick = (item: any) => {
    setIdNCC(item.id);
    setValueSelect(item.name);
    setShowSuggest(false);
  };

  const hanldeAddProduct = (item: IProduct) => {
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
          import_price: item.import_price
        });
      }
    } else {
      prepend({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        quantity_import: 0,
        import_price: item.import_price
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
    if (+idNcc === 0) {
      toast.warning("Bạn chưa chọn nhà cung cấp");
      return;
    }

    const dataSuccsess = products?.map((item: any) => ({
      id: item.id,
      quantity: item.quantity_import,
      import_price: item.import_price
    }));

    if (dataSuccsess.length === 0) {
      toast.warning("Bạn chưa nhập sẩn phẩm nào");
      return;
    }

    const dataSubmit = {
      supplier_id: +idNcc,
      import_date: getDateNow(),
      products: [...dataSuccsess]
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDispatch(addShipmentsThunks(dataSubmit));
    // toast.success("Tạo phiếu nhập hàng thành công");
  };

  return (
    <form
      className="grid grid-cols-[3fr,1fr] gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <NavLink to="/import_shipments">
          <span className="text-xl font-bold mb-5 inline-block">Nhập hàng</span>
        </NavLink>
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
                  Số lượng
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
        <span className="flex justify-end mb-5 text-lg">
          Tổng số tiền nhập hàng:
          {control && <TotalAmout control={control} />}
        </span>
      </div>
      <div className="p-3 border flex flex-col mt-8 h-[65vh] justify-between">
        <div className="overflow-auto relative">
          <TextField
            value={valueSelect}
            label="Nhà cung cấp"
            placeholder="Tìm kiếm nhà cung cấp..."
            onChange={handleChangeValue}
            name="supplior"
            autoComplete="off"
          />
          {showSuggest && valueSelect !== "" && (
            <ul className="mt-2 rounded z-50 absolute w-full cursor-pointer">
              {matchs.map((item: any, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => hanldeClick(item)}
                    className="p-4 bg-gray-100 hover:bg-gray-200 rounded-md border-b-2 mx-1"
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="overflow-y-scroll">
            <h4 className="mt-5 text-md">Sản phẩm hiện có:</h4>
            {productsSelects?.map((item: any) => (
              <div
                key={item.id}
                className="flex gap-5 p-4 cursor-pointer w-full border-2  shadow-sm mt-1 py-3 px-4 hover:text-orange-primary transition duration-300 hover:bg-zinc-200"
                onClick={() => hanldeAddProduct(item)}
              >
                <div>
                  {item.image !== null ? (
                    <img
                      src={item.image}
                      alt="ảnh sản phẩm"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <img
                      src="http://linhkienzin.vn/images/iconCartPro_.png"
                      alt="ảnh sản phẩm"
                      width="50px"
                      height="50px"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>{<FormatNumber number={item.import_price} />}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5">
          <Button fullWidth className="py-4 text-xl" type="submit">
            Đặt hàng
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ShipMentsForm;
