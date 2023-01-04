import React from "react";
import ReactPaginate from "react-paginate";
import { Caret } from "../../components/icons";

const KhachHang = () => {
  return (
    <div>
      <div className="mt-4 mx-4">
        <div className="md:col-span-2 xl:col-span-3">
          <h3 className="text-lg font-semibold">Khách hàng</h3>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4 border shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50">
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    10.000.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Đã thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">15-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hitney Wouston</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    850.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                      Chưa thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">11-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    10.000.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
                      Đã thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">15-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hitney Wouston</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    850.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                      Chưa thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">11-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    10.000.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Đã thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">15-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hitney Wouston</p>
                        <p className="text-xs text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    850.000 <span className="font-mono">VNĐ</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                      Chưa thanh toán{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">11-01-2021</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
            <span className="flex items-center col-span-3"></span>
            <span className="col-span-2" />
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <ReactPaginate
                pageCount={10}
                containerClassName="pagination mt-5"
                pageClassName="pagination_item"
                activeClassName="pagination_active"
                previousLabel={<Caret width={"15px"} />}
                nextLabel={<Caret className="rotate-180" width={"15px"} />}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhachHang;
