import { ChangeEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getReceiByCode } from "../../../api/receipt.api";
import refundServices from "../../../api/refund.api";
import { Button, Select, TextField } from "../../../components";
import IOption from "../../../types/option.model";

interface IReturnProduct {
  product_id: number;
  name: string;
  quantity: number;
  export_price: number;
  refund_price: number;
  lot_code: string;
}

interface InputForm {
  exportCode: string;
  products: IReturnProduct[];
}

interface IDetailBill {
  address: string | null;
  custumer: {
    id: number;
    name: string;
    address: string;
    phone_number: string;
  };
  export_code: string;
  export_date: string;
  export_shipment_detail: any[];
  export_type: number;
  user_id: number;
}

const REFUND_TYPE: IOption[] = [
  { label: "Hàng khách trả", value: 1 },
  { label: "Hàng nhập lỗi", value: 1 }
];

const ProductBrokenForm = () => {
  const [productsInBill, setProductsInBill] = useState<any[]>([]);
  const [exportBill, setExportBill] = useState<IDetailBill>();
  const [refundType, setRefundType] = useState<IOption>(REFUND_TYPE[0]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors }
  } = useForm<InputForm>({});

  const { fields, append, update, remove } = useFieldArray({
    name: "products",
    control
  });

  const handleSearchBill = async () => {
    const { data } = await getReceiByCode(getValues("exportCode"));

    setExportBill(data.data[0]);
    setProductsInBill(data.data[0].export_shipment_detail);
  };

  const handleReturnProduct = async (item: any) => {
    append({
      product_id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      export_price: item.price,
      refund_price: item.price,
      lot_code: item.lot_code
    });
  };

  const handleUpdateReturnProduct = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    update(index, {
      product_id: fields[index].product_id,
      name: fields[index].name,
      quantity: fields[index].quantity,
      export_price: fields[index].export_price,
      refund_price: fields[index].refund_price,
      lot_code: fields[index].lot_code,
      [field]: Number(e.target.value)
    });
  };

  const onSubmit = async (formData: InputForm) => {
    if (!exportBill) return;

    const totalRefund = fields.reduce((total: number, item) => {
      return (total += item.export_price);
    }, 0);
    const totalQuantity = fields.reduce((total: number, item) => {
      return (total += item.quantity);
    }, 0);

    const products_refund = fields.map((product: IReturnProduct) => {
      return {
        ...product,
        id: product.product_id
      };
    });

    try {
      const { data } = await refundServices.addCustomerRefundBill({
        export_shipment_id:
          exportBill.export_shipment_detail[0].export_shipment_id,
        refund_totall_quantity: totalQuantity,
        refund_type: 1,
        supplier_id: exportBill.custumer.id,
        user_id: exportBill.user_id,
        description: "Hàng khách trả lỗi",
        refund_price_totail: totalRefund,
        products: products_refund
      });

      navigate("/inventory/product/damaged");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại !!!");
    }
  };

  return (
    <div>
      <p className="mb-5 text-xl font-semibold uppercase">Thêm hàng lỗi</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <p className="block mb-2 text-base">Lọa hàng lỗi</p>
          <Select
            option={refundType}
            options={REFUND_TYPE}
            handleClickChange={(value) => setRefundType(value)}
          />
        </div>

        <div className="mb-5">
          <p className="block mb-2 text-base">Mã đơn</p>
          <div className="flex items-center gap-x-5">
            <TextField
              containerClass="flex-grow"
              {...register("exportCode")}
              placeholder="Nhập mã đơn hàng..."
            />
            <Button onClick={handleSearchBill}>Tìm kiếm</Button>
          </div>
        </div>

        <div className="mb-5">
          <p className="block mb-2 text-base">Chi tiết đơn hàng</p>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-[14px] leading-[27px]">Mã lô</th>
                  <th className="p-[14px] leading-[27px]">Tên sản phẩm</th>
                  <th className="p-[14px] leading-[27px]">Giá xuất</th>
                  <th className="p-[14px] leading-[27px]">Số lượng</th>
                  <th className="p-[14px] leading-[27px]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {productsInBill.length > 0 &&
                  productsInBill.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.lot_code}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.product.name}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.price}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.quantity}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          <Button
                            variant="error"
                            onClick={() => handleReturnProduct(item)}
                          >
                            Trả hàng
                          </Button>
                        </td>
                      </tr>
                    );
                  })}

                {productsInBill.length === 0 && (
                  <tr>
                    <td className="text-base text-center py-10" colSpan={5}>
                      Vui lòng nhập mã đơn xuất !!!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-5">
          <p className="block mb-2 text-base">Danh sách hàng trả</p>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-[14px] leading-[27px]">Tên sản phẩm</th>
                  <th className="p-[14px] leading-[27px]">Giá bán</th>
                  <th className="p-[14px] leading-[27px]">Số lượng</th>
                  <th className="p-[14px] leading-[27px]">Trả khách</th>
                  <th className="p-[14px] leading-[27px]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {fields.length > 0 &&
                  fields.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.name}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.export_price}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          <input
                            type="number"
                            className="outline-none border-b"
                            defaultValue={item.quantity}
                            onChange={(e) =>
                              handleUpdateReturnProduct(e, index, "quantity")
                            }
                          />
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          <input
                            type="number"
                            className="outline-none border-b"
                            defaultValue={item.refund_price}
                            onChange={(e) =>
                              handleUpdateReturnProduct(
                                e,
                                index,
                                "refund_price"
                              )
                            }
                          />
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          <Button variant="error" onClick={() => remove(index)}>
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    );
                  })}

                {fields.length === 0 && (
                  <tr>
                    <td className="text-base text-center py-10" colSpan={5}>
                      Vui lòng nhập mã đơn xuất !!!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Button type="submit">Tạo</Button>
      </form>
    </div>
  );
};

export default ProductBrokenForm;
