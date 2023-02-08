import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import { TrashIcon } from "../../../components/icons";
import { deleteOrderItem } from "../../../store/slice/order.slice";
import { numberWithCommas } from "../../../utils/funtion";

const OrderList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orderList, currentOrder } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <div className="h-full relative">
      <div className="h-[549px] overflow-y-scroll">
        {orderList[currentOrder - 1]?.products.map((item, index) => (
          <div className="bg-white rounded-md mb-4" key={item.id}>
            <div className="flex items-center gap-x-10 bg-gray-100 p-4 rounded-lg">
              <p className="text-lg">{index + 1}</p>

              <div className="grow">
                <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
                  <div className="text-base font-medium">
                    <span>{item.name}</span>
                  </div>

                  <div className="text-base mr-5">
                    <input
                      type="number"
                      className="outline-none border-b border-black mr-10 bg-transparent"
                      placeholder="Số lượng"
                      value={item.quantity}
                      readOnly
                    />
                    <input
                      type="text"
                      className="outline-none border-b border-black bg-transparent"
                      placeholder="Giá bán"
                      value={item.price}
                      readOnly
                    />
                  </div>
                </div>

                {/* <p className="text-lg font-semibold text-blue-500">
                  Tổng: 150.000
                </p> */}
              </div>

              <TrashIcon
                fill="red"
                className="hover:cursor-pointer"
                onClick={() =>
                  dispatch(
                    deleteOrderItem({
                      productId: item.id,
                      monney: item.price * item.quantity
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[14px] w-full">
        <div className="flex justify-between p-5 bg-gray-100 text-xl font-medium rounded-md">
          <p>Tổng tiền hàng</p>
          <p>{numberWithCommas(orderList[currentOrder - 1]?.total)} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
