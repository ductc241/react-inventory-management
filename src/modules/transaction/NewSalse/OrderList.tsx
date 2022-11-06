import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import { TrashIcon } from "../../../components/icons";
import { deleteItemOrder } from "../../../store/slice/order.slice";

const OrderList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orderList, currentOrder } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <div className="h-full relative">
      <div className="h-[549px] overflow-y-scroll">
        {orderList[currentOrder - 1]?.products.map((item, index) => (
          <div className="p-4 bg-white rounded-md mb-4" key={item.id}>
            <div className="flex items-center gap-x-10">
              <p className="text-lg">{index + 1}</p>

              <div className="grow">
                <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
                  <div className="text-base font-medium">
                    <span>{item.name}</span>
                  </div>

                  <div className="text-base mr-5">
                    <input
                      type="number"
                      className="outline-none border-b mr-10"
                      placeholder="Số lượng"
                      value={item.quantity}
                      readOnly
                    />
                    <input
                      type="text"
                      className="outline-none border-b"
                      placeholder="Giá bán"
                      value={item.price}
                      readOnly
                    />
                  </div>
                </div>

                <p className="text-lg font-semibold text-blue-500">
                  Tổng: 150.000
                </p>
              </div>

              <TrashIcon
                fill="red"
                className="hover:cursor-pointer"
                onClick={() =>
                  dispatch(deleteItemOrder({ productId: item.id }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[14px] w-full">
        <div className="flex justify-between p-5 bg-white text-xl font-medium rounded-md">
          <p>Tổng tiền hàng</p>
          <p>150.000 VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
