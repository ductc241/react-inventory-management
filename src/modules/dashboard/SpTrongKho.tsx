import React from 'react'
import ReactPaginate from 'react-paginate'
import { Caret } from '../../components/icons'

type Props = {}

const SpTrongKho = (props: Props) => {
  return (
    <div>
      <div className="mt-4 mx-4">
        <div className="md:col-span-2 xl:col-span-3">
          <h3 className="text-lg font-semibold">
            Thống kê sản phẩm trong kho
          </h3>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs py-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Sản phẩm</th>
                  <th className="px-4 py-3">Giá / 1c</th>
                  <th className="px-4 py-3">Số lượng</th>
                  <th className="px-4 py-3">Tổng xuất / tháng</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://product.hstatic.net/1000063620/product/sac-apple-20w-usb-c-chinh-hang-apple-viet-nam_3cd9d5a1542441ee9af6d1030b4201ae_1024x1024.jpg"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Củ Sạc iPhone Origin 20W</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Củ sạc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">25.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://hoanghamobile.com/Uploads/2020/09/22/Tai%20nghe%20Apple%20AirPods%20Pro.png"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Tai nghe Apple AirPods Pro - Chính hãng Apple</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Tai nghe {/* Nhóm hàng */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">3.500.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://product.hstatic.net/1000063620/product/sac-apple-20w-usb-c-chinh-hang-apple-viet-nam_3cd9d5a1542441ee9af6d1030b4201ae_1024x1024.jpg"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Củ Sạc iPhone Origin 20W</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Củ sạc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">25.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://hoanghamobile.com/Uploads/2020/09/22/Tai%20nghe%20Apple%20AirPods%20Pro.png"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Tai nghe Apple AirPods Pro - Chính hãng Apple</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Tai nghe {/* Nhóm hàng */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">3.500.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://product.hstatic.net/1000063620/product/sac-apple-20w-usb-c-chinh-hang-apple-viet-nam_3cd9d5a1542441ee9af6d1030b4201ae_1024x1024.jpg"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Củ Sạc iPhone Origin 20W</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Củ sạc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">25.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://hoanghamobile.com/Uploads/2020/09/22/Tai%20nghe%20Apple%20AirPods%20Pro.png"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Tai nghe Apple AirPods Pro - Chính hãng Apple</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Tai nghe {/* Nhóm hàng */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">3.500.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://product.hstatic.net/1000063620/product/sac-apple-20w-usb-c-chinh-hang-apple-viet-nam_3cd9d5a1542441ee9af6d1030b4201ae_1024x1024.jpg"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Củ Sạc iPhone Origin 20W</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Củ sạc
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">25.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://hoanghamobile.com/Uploads/2020/09/22/Tai%20nghe%20Apple%20AirPods%20Pro.png"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Tai nghe Apple AirPods Pro - Chính hãng Apple</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Tai nghe {/* Nhóm hàng */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">3.500.000 <span className="font-mono">VNĐ</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className="text-sm">
                      100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">19</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
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
  )
}

export default SpTrongKho