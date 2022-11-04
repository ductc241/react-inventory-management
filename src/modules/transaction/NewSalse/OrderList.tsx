const OrderList = () => {
  return (
    <div className="h-full relative">
      <div>
        <div className="p-4 bg-white rounded-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laborum, ut dolorum consequatur totam aut eius nemo corrupti amet
            consequuntur, nobis quidem placeat! Alias ex neque consequatur
            voluptatum illo magnam.
          </p>
        </div>
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
