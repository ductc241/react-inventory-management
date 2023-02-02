import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

import { Button } from "../../../components";
import { PictureIcon } from "../../../components/icons";
import { updateOrderItem } from "../../../store/slice/order.slice";
import productServices from "../../../api/product.api";
import { useEffect, useState } from "react";
import { IProduct } from "../../../types/product.type";
import FormatNumber from "../../../components/formatNumber/formatNumber";

interface IProps {
  toggleCheckout: () => void;
}

const ProductFilter = ({ toggleCheckout }: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await productServices.getProducts();

      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="flex flex-col	justify-between h-full bg-white rounded-md shadow-xl">
      <div className="p-3">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 bg-white rounded-md">
          {products.map((item, index) => {
            return (
              <div
                className="p-2 border border-white rounded-md hover:border-blue-400 hover:cursor-pointer"
                key={index}
                onClick={() =>
                  dispatch(
                    updateOrderItem({
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
                  <div className="font-medium">
                    <p className="mb-1.5">{item.name}</p>
                    <p className="text-blue-400">
                      {FormatNumber({ number: item.price })} VNĐ
                    </p>
                    <p className="mt-1">Tồn {item.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <Button
          fullWidth
          className="py-4 text-xl"
          onClick={() => toggleCheckout()}
        >
          Tạo hóa đơn
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
