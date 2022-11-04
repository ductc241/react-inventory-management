import OrderList from "./OrderList";
import ProductFilter from "./ProductFilter";

const NewSale_Order = () => {
  return (
    <div className="p-4 bg-gray-100 h-full">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-7">
          <OrderList />
        </div>
        <div className="col-span-5">
          <ProductFilter />
        </div>
      </div>
    </div>
  );
};

export default NewSale_Order;
