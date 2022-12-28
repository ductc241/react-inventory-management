import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { AppDispatch, RootState } from "../../../store/store";

import {
  CloseIcon,
  LogoutIcon,
  NavbarIcon,
  OrderIcon,
  PieChartIcon,
  PlusIcon,
  SearchIcon,
  StatsIcon
} from "../../../components/icons";
import {
  createOrder,
  deleteOrder,
  selectOrder
} from "../../../store/slice/order.slice";

const NewSalse_Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orderList, currentOrder } = useSelector(
    (state: RootState) => state.order
  );

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder({ id }));
  };

  useEffect(() => {
    if (orderList.length === 0) dispatch(createOrder());
  }, [dispatch, orderList]);

  return (
    <div className="flex justify-between items-center bg-blue-500">
      <div className="flex gap-5">
        <div className="inline-flex items-center bg-white m-2 py-2 pl-3 pr-8 rounded-md">
          <SearchIcon fill="gray" width={16} className="mr-2" />
          <input
            type="text"
            placeholder="Tìm hàng hóa"
            className="border-none outline-none bg-transparent w-[400px] text-base"
          />
        </div>

        <div className="mt-2 flex items-center gap-x-3">
          {orderList.length > 0 &&
            orderList.map((item) => (
              <div
                className={clsx(
                  "flex h-full gap-5 items-center px-5 rounded-t-md ",
                  currentOrder === item.id &&
                    "relative bg-gray-100 order-current"
                )}
                key={item.id}
              >
                <p
                  className={clsx(
                    "font-bold hover:cursor-pointer",
                    currentOrder === item.id
                      ? "text-base  text-black"
                      : "text-white"
                  )}
                  onClick={() => dispatch(selectOrder({ id: item.id }))}
                >
                  Hóa đơn {item.id}
                </p>
                <CloseIcon
                  fill={currentOrder === item.id ? "black" : "white"}
                  className="hover:cursor-pointer"
                  onClick={() => handleDeleteOrder(item.id)}
                />
              </div>
            ))}

          <div
            className="ml-5 p-[1px] border border-white rounded-full hover: cursor-pointer"
            onClick={() => dispatch(createOrder())}
          >
            <PlusIcon fill="white" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 py-2 px-4 text-white text-base">
        <p>0922345555</p>
        <div className="relative">
          <NavbarIcon
            fill="white"
            width={20}
            className="hover:cursor-pointer"
            onClick={() => setShowSubMenu((prev) => !prev)}
          />

          {showSubMenu && (
            <div className="absolute top-[30px] right-0 w-max">
              <ul className="py-4 px-2.5 text-base bg-white text-black rounded-lg shadow-xl">
                <li className="flex items-center gap-x-6 py-3 px-4 cursor-pointer hover:bg-[#eff2f5]">
                  <PieChartIcon width={22} fill="gray" />
                  Xem báo cáo cuối ngày
                </li>
                <li className="flex items-center gap-x-6 py-3 px-4 cursor-pointer hover:bg-[#eff2f5]">
                  <OrderIcon width={22} fill="gray" />
                  Danh sách hóa đơn
                </li>
                <li className="flex items-center gap-x-7 py-3 px-4 cursor-pointer hover:bg-[#eff2f5]">
                  <StatsIcon width={20} fill="gray" />
                  Quản lý
                </li>

                <li className="flex items-center gap-x-7 py-3 px-4 cursor-pointer hover:bg-[#eff2f5]">
                  <LogoutIcon width={22} fill="gray" />
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSalse_Header;
