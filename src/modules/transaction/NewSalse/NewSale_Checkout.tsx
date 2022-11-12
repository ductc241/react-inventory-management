import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../../../store/store";

import { Button } from "../../../components";
import { CloseIcon } from "../../../components/icons";
import orderServices from "../../../api/order";
import { deleteOrder } from "../../../store/slice/order.slice";
import { getDateNow, numberWithCommas } from "../../../utils/funtion";

interface IProps {
  toggleCheckout: () => void;
}

const NewSale_Checkout = ({ toggleCheckout }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentOrder, orderList } = useSelector(
    (state: RootState) => state.order
  );

  const handleCheckout = async () => {
    const order = orderList.find((i) => i.id === currentOrder);

    if (!order) return;

    if (order.products.length === 0) {
      toggleCheckout();
      toast.warning("Đơn hàng đang trống");
      return;
    }

    const orderProducts = order.products.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        price: item.price
      };
    });

    await orderServices.creatOrder({
      user_id: 1,
      export_date: getDateNow(),
      products: orderProducts,
      total_price: order.total,
      status: "completed"
    });
    toggleCheckout();
    toast.success("Hoàn thành hóa đơn");
    dispatch(deleteOrder({ id: currentOrder }));
  };

  return (
    <div className="absolute inset-0 z-[999] bg-[#00000087]">
      <div className="absolute top-0 bottom-0 right-0 w-[480px] py-5 px-8 bg-white rounded-tl-xl rounded-bl-xl">
        <div className="relative h-full">
          <div className="flex justify-end items-center pb-3 border-b">
            <div className="mr-10 text-gray-500">
              <span className="mr-2">10/12/2020</span>
              <span>10:20</span>
            </div>

            <CloseIcon
              fill="gray"
              className="hover:cursor-pointer"
              onClick={() => toggleCheckout()}
            />
          </div>

          <div className="pt-5 text-lg">
            <p className="mb-5 text-xl font-semibold">Khách lẻ</p>
            <div className="flex justify-between mb-3">
              <p>Tổng tiền hàng</p>
              <p className="text-[17px]">
                {numberWithCommas(orderList[currentOrder - 1]?.total)}
              </p>
            </div>
            <div className="flex justify-between mb-3">
              <p>Giảm giá</p>
              <div className="w-[120px] border-b border-slate-300">
                <p className="text-[17px] text-right">0</p>
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <p>Khách cần trả</p>
              <p className="text-lg text-blue-500 font-semibold ">
                {numberWithCommas(orderList[currentOrder - 1]?.total)}
              </p>
            </div>
            <div className="flex justify-between mb-3">
              <p>Khách thanh toán</p>
              <p className="text-[17px]">0</p>
            </div>
          </div>

          <div className="absolute bottom-5 w-full">
            <Button fullWidth onClick={handleCheckout}>
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSale_Checkout;
