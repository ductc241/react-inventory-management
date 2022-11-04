import { Button } from "../../../components";
import { PictureIcon } from "../../../components/icons";

const products = [
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" },
  { name: "Sạc điện thoại", price: "150.000" }
];

const ProductFilter = () => {
  return (
    <div className="flex flex-col	justify-between h-full bg-white rounded-md">
      <div className="p-3">
        <div className="mb-8 p-2">Filter Title</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-4 bg-white rounded-md">
          {products.map((item, index) => {
            return (
              <div
                className="p-2 border border-white rounded-md hover:border-blue-400 hover:cursor-pointer"
                key={index}
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
