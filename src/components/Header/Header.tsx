/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */

import "./Header.styles.css";

const Header = () => {
  return (
    <div>
      <div>
        {/* follow me on twitter asad_codes */}
        <div className="flex flex-wrap place-items-center">
          <section className="relative mx-auto">
            {/* navbar */}
            <nav className="flex justify-between bg-[#00263a] text-white w-screen">
              <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <a className="w-20" href="#">
                  {/* <img class="h-9" src="logo.png" alt="logo"> */}
                  <img
                    src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1664895627/poly_wareh_j06pfe.png"
                    alt=""
                    width="90px"
                  />
                </a>
                {/* Nav Links */}
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                  <li>
                    <div className="group inline-block">
                      <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          Tổng quan
                        </span>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="group inline-block">
                      <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          Hàng hoá
                        </span>
                        <span>
                          <svg
                            className="fill-current h-4 w-4 transform group-hover:-rotate-180
                            transition duration-150 ease-in-out"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </ul>
                      <ul
                        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-48 py-2 drop-shadow-xl"
                      >
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Danh mục
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Thiết lập giá
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Phiếu bảo hành
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Kiểm kho
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="group inline-block">
                      <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          Giao dịch
                        </span>
                        <span>
                          <svg
                            className="fill-current h-4 w-4 transform group-hover:-rotate-180
                            transition duration-150 ease-in-out"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </ul>
                      <ul
                        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-48 py-2 drop-shadow-xl"
                      >
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Đơn đặt
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Hoá đơn
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Vận đơn
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Trả hàng
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Nhập hàng
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Trả hàng nhập
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Xuất huỷ
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="group inline-block">
                      <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          Đối tác
                        </span>
                        <span>
                          <svg
                            className="fill-current h-4 w-4 transform group-hover:-rotate-180
                            transition duration-150 ease-in-out"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </ul>
                      <ul
                        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-48 py-2 drop-shadow-xl"
                      >
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Khách hàng
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Nhà cung cấp
                        </li>
                        <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                          Đối tác
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="group inline-block">
                      <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          Số quỹ
                        </span>
                      </ul>
                    </div>
                  </li>
                </ul>
                {/* Header Icons */}
                <div className="hidden xl:flex items-center space-x-5 items-center">
                  <a className="flex items-center hover:text-gray-200" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="flex absolute -mt-5 ml-4">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
                    </span>
                  </a>

                  <div className="group inline-block">
                    <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                      <span className="pr-1 font-semibold flex-1">
                        <a className="flex items-center hover:text-gray-200" href="#">
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
                        </a>
                      </span>
                    </ul>
                    <ul
                      className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-48 py-2 drop-shadow-xl"
                      >
                      <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                        Danh mục
                      </li>
                    </ul>
                  </div>



                </div>
              </div>
              {/* Responsive navbar */}
              <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <button
                  className="text-white inline-flex p-3 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
                  data-target="#navigation"
                >
                  <div id="menuToggle">
                    <input type="checkbox" />
                    <span />
                    <span />
                    <span />
                    <ul id="menu">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Info</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      {/* <li className="relative">
                      <a href="#">home</a>
                    </li> */}
                    </ul>
                  </div>
                </button>


              </a>
            </nav>
          </section>
        </div>
        {/* Does this resource worth a follow? */}
      </div>
    </div>
  );
};

export default Header;
