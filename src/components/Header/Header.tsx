import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../api/login.api";
import "./Header.styles.css";

const Header = () => {
  const navigate = useNavigate();
  const menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);

  const setMenuValue = (props: any) => {
    const newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
          {/* Header */}
          <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-52 h-14 bg-slate-800 border-none">
              <Link to="/" className="w-20">
                <img
                  src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1664895627/poly_wareh_j06pfe.png"
                  alt=""
                  width="70px"
                />
              </Link>
            </div>
            <div className="flex justify-between items-center h-14 bg-slate-800 header-right">
              <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 ml-4 p-2 shadow-sm border border-gray-200">
                <button className="outline-none focus:outline-none">
                  <svg
                    className="w-5 text-gray-600 h-5 cursor-pointer"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
                />
              </div>
              <ul className="flex items-center">
                <div className="group inline-block">
                  <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                    <span className="pr-1 font-semibold flex-1">
                      <Link
                        className="flex items-center hover:text-gray-200"
                        to="#"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            ></path>
                          </svg>
                        </span>
                        <span className="flex absolute -mt-5 ml-4">
                          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
                        </span>
                      </Link>
                    </span>
                  </ul>
                  <ul
                    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-40 py-2 drop-shadow-xl -ml-28"
                  >
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <Link to="/signup">Thông báo 1</Link>
                    </li>
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <Link to="/signup">Thông báo 1</Link>
                    </li>
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <Link to="/signup">Thông báo 1</Link>
                    </li>
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <Link to="/signup">Thông báo 1</Link>
                    </li>
                  </ul>
                </div>
                <li>
                  <div className="block w-px h-6 bg-gray-400" />
                </li>
                <div className="group inline-block md:mr-8">
                  <ul className="outline-none focus:outline-none px-2 py-1 rounded-sm flex items-center min-w-32 -ml-2">
                    <span className="pr-1 font-semibold flex-1">
                      <Link
                        className="flex items-center hover:text-gray-200"
                        to="#"
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </Link>
                    </span>
                  </ul>
                  <ul
                    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-40 py-2 drop-shadow-xl -ml-28"
                  >
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <Link to="">Tài khoản</Link>
                    </li>
                    <li className="rounded-sm px-3 py-1 text-center hover:text-green-700">
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
          {/* ./Header */}
          {/* Sidebar */}
          <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-52 md:w-52 bg-slate-800 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    {/* <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      Menu
                    </div> */}
                    <div className="block w-full h-px bg-gray-400" />
                  </div>
                </li>
                <li>
                  <Link
                    to="/"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-400 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </span>
                    <span className="ml-4 text-sm tracking-wide truncate">
                      Tổng quan
                    </span>
                  </Link>
                </li>
                <li className="mr-3 flex-1">
                  <div>
                    <div>
                      <button
                        onClick={() => setMenuValue(0)}
                        className="text-white flex items-center w-full py-2 w-[600px]
                        relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-400 pr-6 "
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <img
                            src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1669396689/shopping-bag_1_qeoipo.svg"
                            alt=""
                            width="17px"
                          />
                        </span>
                        <p className="ml-5 text-sm tracking-wide truncate">
                          Hàng hoá
                        </p>
                        <div className="ml-8">
                          <svg
                            id="icon1"
                            className={`${
                              menu[0] ? "" : "rotate-180"
                            } transform duration-100`}
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 15L12 9L6 15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                      <div
                        id="menu1"
                        className={`${
                          menu[0] ? "flex" : "hidden"
                        } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
                      >
                        <Link
                          to="/products"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Danh mục</p>
                        </Link>
                        <Link
                          to="/pricebook"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">
                            Thiết lập giá
                          </p>
                        </Link>
                        <Link
                          to="#"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">
                            Phiếu bảo hành
                          </p>
                        </Link>
                        <Link
                          to="#"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Kiểm kho</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mr-3 flex-1">
                  <div>
                    <div>
                      <button
                        onClick={() => setMenuValue(1)}
                        className="text-white flex items-center w-full py-2 w-[600px]
                        relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500 pr-6 "
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <img
                            src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1669396970/apps-sort_cbsixy.svg"
                            alt=""
                            width="17px"
                          />
                        </span>
                        <p className="ml-5 text-sm tracking-wide truncate">
                          Giao dịch
                        </p>
                        <div className="ml-[34px]">
                          <svg
                            id="icon1"
                            className={`${
                              menu[1] ? "" : "rotate-180"
                            } transform duration-100`}
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 15L12 9L6 15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                      <div
                        id="menu2"
                        className={`${
                          menu[1] ? "flex" : "hidden"
                        } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
                      >
                        <Link
                          to="#"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Đơn đặt</p>
                        </Link>
                        <Link
                          to="/receipt"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Đơn xuất</p>
                        </Link>
                        <Link
                          to="#"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Vận đơn</p>
                        </Link>
                        <Link
                          to="/returns"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Trả hàng</p>
                        </Link>
                        <Link
                          to="/import_shipments"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Nhập hàng</p>
                        </Link>
                        <Link
                          to="/refund"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">
                            Trả hàng nhập
                          </p>
                        </Link>
                        <Link
                          to="#"
                          className="flex justify-start ml-2 items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-48"
                        >
                          <p className="text-base leading-4 ml-8">Xuất huỷ</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mr-3 flex-1">
                  <div>
                    <div>
                      <Link to="/supplier"
                        className="text-white flex items-center w-full py-2 w-[600px]
                        relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500 pr-6 "
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <img
                            src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1669397066/users-alt_1_xanuwe.svg"
                            alt=""
                            width="17px"
                          />
                        </span>
                        <p className="ml-5 text-sm tracking-wide truncate">
                          Nhà cung cấp
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="mr-3 flex-1">
                  <div>
                    <div>
                      <Link
                        to="/soquy"
                        onClick={() => setMenuValue(2)}
                        className="text-white flex items-center w-full py-2 w-[600px]
                        relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500 pr-6 "
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <img
                            src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1669397210/usd-circle_q1yme2.svg"
                            alt=""
                            width="17px"
                          />
                        </span>
                        <p className="ml-5 text-sm tracking-wide truncate">
                          Số quỹ
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="mr-3 flex-1">
                  <div>
                    <div>
                      <Link
                        to="/user"
                        onClick={() => setMenuValue(3)}
                        className="text-white flex items-center w-full py-2 w-[600px]
                        relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-700 hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500 pr-6 "
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <img
                            src="https://cdn1.iconfinder.com/data/icons/essential-21/128/User-512.png"
                            alt=""
                            width="17px"
                            className="bg-white rounded-md"
                          />
                        </span>
                        <p className="ml-5 text-sm tracking-wide truncate">
                          Nhân viên
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
              <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
                Copyright @2022
              </p>
            </div>
          </div>
          {/* ./Sidebar */}
          <div className="h-full ml-16 mt-16 mb-24 md:ml-52 md:p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
