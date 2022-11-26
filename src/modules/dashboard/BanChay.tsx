import React from "react";

interface IProp {
  data: any;
}

const BanChay = ({ data }: IProp) => {
  const quantityInStock = data?.map((item: any) => {
    return {
      product_id: item.product_id,
      product_name: item.product_name,
      total_quantity: item.total_quantity,
      inStock: ((+item.total_quantity / item.product_quantity) * 100).toFixed(1)
    };
  });

  return (
    <div>
      <div className="p-4">
        <div className="md:col-span-2 xl:col-span-3 mt-2">
          <h3 className="text-lg font-semibold">Sản phẩm bán chạy</h3>
        </div>
        <div className="relative flex flex-col min-w-0 mb-4 mt-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded border">
          <div className="rounded-t mb-0 px-0 border-0">
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Sản phẩm
                    </th>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Số lượng
                    </th>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      % / Số lượng trong kho
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quantityInStock?.map((item: any) => (
                    <tr className="text-gray-700" key={item.product_id}>
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.product_name}
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.total_quantity}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{item.inStock} %</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{ width: `${+item.inStock}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ./Social Traffic */}
      </div>
    </div>
  );
};

export default BanChay;
