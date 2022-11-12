import { useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  useWatch
} from "react-hook-form";

import { Button, TextField } from "../../../components";
import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../../hook/hook";
import {
  getDataSupplierProductApi,
  getOneShipment,
  getSuppliersApi
} from "../../../api/shipments";
import { TrashIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { useAppDispatch } from "../../../hook/hook";
import { addShipmentsThunks } from "../../../store/slice/shipments";

type Inputs = {
  supplier_id: number;
  products: {
    id: number;
    quantity: number;
    import_price: number;
  }[];
};

const ShipMentsForm = () => {
  const [valueSelect, setValueSelect] = useState<any>(0);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [productsSelects, setProductsSelects] = useState<any | undefined>([]);
  const { id } = useParams();
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, reset, register, control } = useForm<Inputs>();
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

  useEffect(() => {
    const getOneShipments = async () => {
      if (id) {
        const { data } = await getOneShipment(id);
        reset(data);
      }
    };

    getOneShipments();
  }, [id, reset]);

  // Call API theo nhà cung cấp
  useEffect(() => {
    const getShipemnteProductsAPI = async () => {
      if (valueSelect !== 0) {
        const { data } = await getDataSupplierProductApi(valueSelect);
        setProductsSelects(data.products1);
      }
    };
    getShipemnteProductsAPI();
  }, [valueSelect]);

  const handleChangValue = (e: any) => {
    setValueSelect(e.target.value);
    remove();
  };

  const handleAddProductsShipments = () => {
    if (valueSelect !== 0) {
      prepend({
        id: 0,
        quantity: 1,
        import_price: 0
      });
    } else if (valueSelect == 0) {
      toast.warning("Bạn cần nhập nhà cung cấp!!");
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
          (Number.isNaN(b.quantity) ? 0 : b.quantity) *
            (Number.isNaN(b.import_price) ? 0 : b.import_price),
        0
      );
    }

    return (
      <p>
        <strong className="mx-2">{<FormatNumber number={totalArr} />}</strong>
        VND
      </p>
    );
  };

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const date = new Date();
    const dataSubmit = {
      supplierId: 1,
      import_price_totail: 1000000,
      status: true,
      productId: 1,
      ////////
      supplier_id: +valueSelect,
      import_date: date.toLocaleDateString(),
      ...data
    };
    if (valueSelect === 0) {
      toast.warning("Phiếu chưa có sản phẩm nào");
    } else if (valueSelect !== 0) {
      console.log(dataSubmit);
      navigate(-1);
      toast.success("Thêm sản phẩm thành công");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDispatch(addShipmentsThunks(dataSubmit));
    }
  };

  return (
    <form className="w-6/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <p className="mb-5 text-xl font-semibold">Phiếu nhập hàng</p>
      </div>
      <span className="text-base font-bold mb-2 block">Thêm nhà cung cấp</span>
      {/* Select nhà cung cấp  */}
      <div className="w-full">
        <select
          className="border-[2px] w-full col-span-6 p-2.5 rounded-md mb-5"
          onChange={(e) => handleChangValue(e)}
        >
          <option defaultValue="0">Chọn nhà cung cấp</option>
          {suppliersOptions?.map((item: any) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* Table hiển thị sản phẩm */}
      <div className="mb-2 flex justify-end">
        <Button
          className=""
          onClick={() => {
            handleAddProductsShipments();
          }}
        >
          +
        </Button>
      </div>
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
                      <select
                        {...register(`products.${index}.id`, {
                          valueAsNumber: true,
                          required: true
                        })}
                        placeholder="Nhập sản phẩm"
                        className="border px-4 py-3 h-12 rounded-md"
                      >
                        {productsSelects?.map((item: any) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td className="p-[14px] first:pl-[24px] last:pr-[24px] text-sm">
                      <TextField
                        {...register(`products.${index}.quantity`, {
                          valueAsNumber: true
                        })}
                        type="number"
                        className="w-2/3"
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
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tính tổng số tiền */}
      <span className="flex justify-end mb-5 text-lg">
        Tổng số tiền nhập hàng:
        <TotalAmout control={control} />
      </span>
      {/* Button Submit and cencal */}
      <div className="flex gap-5 mb-5 justify-end">
        <Button type="submit">Xác nhận</Button>
        <Button variant="warning" onClick={() => navigate(-1)}>
          Bỏ qua
        </Button>
      </div>
    </form>
  );
};

export default ShipMentsForm;
