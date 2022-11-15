import React from 'react'
import ReactPaginate from 'react-paginate'
import { Caret } from '../../components/icons'
import { Table, Button } from "../../components";
import { Link } from 'react-router-dom';


const PhanQuyen = () => {
  return (
    <div>
      <div className="mt-4 mx-4">
        <div className="md:col-span-2 xl:col-span-3">
          <h3 className="text-2xl font-semibold">
            Bảng phân quyền
          </h3>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4 border shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Chức năng</th>
                  <th className="px-4 py-3 text-center">Truy cập</th>
                  <th className="px-4 py-3 text-center">Thêm</th>
                  <th className="px-4 py-3 text-center">Sửa</th>
                  <th className="px-4 py-3 text-center">Xoá</th>
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
                        <p className="font-semibold text-left">Tên TK</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Admin
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />
                    {/* <label htmlFor="checkbox-one" className="ml-3">Checkbox Two</label> */}

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>

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
                        <p className="font-semibold text-left">Tên TK</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Quản lý
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />
                    {/* <label htmlFor="checkbox-one" className="ml-3">Checkbox Two</label> */}

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>

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
                        <p className="font-semibold text-left">Tên TK</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Nhân viên
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />
                    {/* <label htmlFor="checkbox-one" className="ml-3">Checkbox Two</label> */}

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>

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
                        <p className="font-semibold text-left">Tên TK</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Nhân viên
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />
                    {/* <label htmlFor="checkbox-one" className="ml-3">Checkbox Two</label> */}

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <input type="checkbox" defaultChecked className="bg-amber-200 hover:bg-amber-400 cursor-pointer 
                                    w-4 h-4 border-3 border-rose-500 rounded-lg checked:bg-green-500" />

                  </td>

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
        <div className="py-6">
          <div className="inline-block mr-2 mt-2">
            <button type="button" className="focus:outline-none select-none text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 focus:bg-green-600 hover:shadow-lg">Cập nhập</button>
          </div>
          <div className="inline-block mr-2 mt-2">
            <Link to="/Profile">
            <button type="cancel" className="focus:outline-none select-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 focus:bg-red-600 hover:shadow-lg">Huỷ</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhanQuyen