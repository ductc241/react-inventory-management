import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import { CloseIcon, NavbarIcon, PlusIcon } from "../../../components/icons";
import { createOrder, selectOrder } from "../../../store/slice/order.slice";
import clsx from "clsx";
import { TextField } from "../../../components";

const NewSalse_Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orderList, currentOrder } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (orderList.length === 0) dispatch(createOrder());
  }, [dispatch, orderList]);

  return (
    <div className="flex justify-between items-center bg-blue-500">
      <div className="flex gap-5">
        {/* <div className="inline-flex items-center bg-white m-2 py-2 pl-3 pr-8 rounded-md">
          <SearchIcon fill="gray" width={16} className="mr-2" />
          <input
            type="text"
            placeholder="Tìm hàng hóa"
            className="border-none outline-none bg-transparent w-[400px] text-base"
          />
        </div> */}

        <TextField
          name="csa"
          placeholder="Tìm sản phẩm"
          containerClass="m-2 ml-4"
          className="w-[450px] py-2"
        />

        <div className="mt-2 flex items-center gap-x-3">
          {orderList.map((item) => (
            <div
              className={clsx(
                "flex h-full gap-5 items-center px-5 rounded-t-md ",
                currentOrder === item.id && "relative bg-gray-100 order-current"
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
        <NavbarIcon fill="white" width={20} />
      </div>
    </div>
  );
};

export default NewSalse_Header;
