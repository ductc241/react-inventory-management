import React from 'react'


const HangHoanTra = () => {
  return (
    <div>
      <div className="p-4">
        <div className="md:col-span-2 xl:col-span-3 mt-2">
          <h3 className="text-lg font-semibold">Hàng bị hoàn trả</h3>
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
                      % / Số lượng xuất ra
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700">
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Sản phẩm 1
                    </th>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      10
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{width:'50px'}}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Sản phẩm 1
                    </th>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      10
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: '50px' }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Sản phẩm 1
                    </th>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      10
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: '50px' }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ./Social Traffic */}
      </div>
    </div>
  )
}

export default HangHoanTra