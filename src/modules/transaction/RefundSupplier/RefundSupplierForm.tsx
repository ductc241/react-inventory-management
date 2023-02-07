import { ChangeEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getReceiByCode } from "../../../api/receipt.api";
import refundServices from "../../../api/refund.api";
import { Button, TextField } from "../../../components";

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
  id: number;
  export_shipment_id: number;
  created_at: string;
  description: string;
  refund_code: string;
  refund_export_shipment_detail: any[];
  refund_price_totail: number;
  refund_totall_quantity: number;
  refund_type: number;
  seller_name: string;
  status: number;
  updated_at: string;
  user_id: number;
  user_name: string;
}

const RefundSupplierForm = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [returnProductBill, setReturnProductBill] = useState<IDetailBill>();
  const [productInReturnBill, setProductInReturnBill] = useState<any[]>([]);

  const [productsInBill, setProductsInBill] = useState<any[]>([]);
  const [exportBill, setExportBill] = useState<IDetailBill>();

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
    const bill: IDetailBill = products.find(
      (item) => item.refund_code === getValues("exportCode")
    );

    setReturnProductBill(bill);
    setProductInReturnBill(bill.refund_export_shipment_detail);
  };

  const handleReturnProduct = async (item: any) => {
    append({
      product_id: item.product.id,
      name: item.product.name,
      quantity: item.refund_quantity,
      export_price: item.export_price,
      refund_price: 0,
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
    if (!returnProductBill) return;

    const totalRefund = fields.reduce((total: number, item) => {
      return (total += item.export_price);
    }, 0);
    const totalQuantity = fields.reduce((total: number, item) => {
      return (total += item.quantity);
    }, 0);

    const products_refund = fields.map((product: IReturnProduct) => {
      return {
        id: product.product_id,
        quantity: product.quantity,
        export_price: product.export_price,
        refund_price: product.refund_price,
        lot_code: product.lot_code
      };
    });

    try {
      const { data } = await refundServices.addSupplierRefundBill({
        id: returnProductBill.id,
        export_shipment_id: returnProductBill.export_shipment_id,
        refund_totall_quantity: totalQuantity,
        refund_price_totail: totalRefund,
        refund_type: 2,
        user_id: 2,
        description: "Trả hàng lỗi",
        products: products_refund
      });

      navigate("/inventory/product/damaged");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại !!!");
    }

    console.log({
      id: returnProductBill.id,
      export_shipment_id: returnProductBill.export_shipment_id,
      refund_totall_quantity: totalQuantity,
      refund_price_totail: totalRefund,
      refund_type: 2,
      user_id: 2,
      description: "Trả hàng lỗi",
      products: products_refund
    });
  };

  useEffect(() => {
    const getInitData = async () => {
      const { data } = await refundServices.getRefundOrderList();
      setProducts(data.data);
    };

    getInitData();
  }, []);

  return (
    <div>
      <p className="mb-5 text-xl font-semibold uppercase">Thêm đơn trả hàng</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <p className="block mb-2 text-base">Mã lô hàng lỗi</p>
          <div className="flex items-center gap-x-5">
            <TextField
              containerClass="flex-grow"
              {...register("exportCode")}
              placeholder="Nhập mã lô hàng..."
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
                  <th className="p-[14px] leading-[27px]">Trả lại khách</th>
                  <th className="p-[14px] leading-[27px]">Số lượng</th>
                  <th className="p-[14px] leading-[27px]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {productInReturnBill.length > 0 &&
                  productInReturnBill.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.lot_code}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.product.name}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.refund_price}
                        </td>
                        <td className="p-[14px] leading-[27px] text-center">
                          {item.refund_quantity}
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

                {productInReturnBill.length === 0 && (
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
                  <th className="p-[14px] leading-[27px]">Số lượng</th>
                  <th className="p-[14px] leading-[27px]">Hoàn tiền</th>
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
                      Vui lòng chọn sản phẩm cần trả !!!
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

export default RefundSupplierForm;
