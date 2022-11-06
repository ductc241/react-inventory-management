import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

import { Button } from "../../../components";
import { PictureIcon } from "../../../components/icons";
import { updateOrder } from "../../../store/slice/order.slice";

const products = [
  { id: 1, name: "Sạc điện thoại", price: 150000 },
  { id: 2, name: "Ốp lưng iphone ", price: 150000 },
  { id: 3, name: "Sạc điện thoại", price: 150000 },
  { id: 4, name: "Sạc điện thoại", price: 150000 },
  { id: 5, name: "Sạc điện thoại", price: 150000 },
  { id: 6, name: "Sạc điện thoại", price: 150000 },
  { id: 7, name: "Sạc điện thoại", price: 150000 },
  { id: 8, name: "Sạc điện thoại", price: 150000 }
];

const ProductFilter = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex flex-col	justify-between h-full bg-white rounded-md">
      <div className="p-3">
        <div className="mb-8 p-2">Filter Components</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-4 bg-white rounded-md">
          {products.map((item, index) => {
            return (
              <div
                className="p-2 border border-white rounded-md hover:border-blue-400 hover:cursor-pointer"
                key={index}
                onClick={() =>
                  dispatch(
                    updateOrder({
                      type: "increase",
                      productId: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1
                    })
                  )
                }
              >
                <div className="flex items-center h-full">
                  <div className="p-4 bg-gray-100 rounded-md mr-3">
                    <PictureIcon fill="orange" />
                  </div>
                  <div className="text-base font-medium">
                    <p className="mb-1.5">{item.name}</p>
                    <p className="text-blue-400">{item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <Button fullWidth className="py-4 text-xl">
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
