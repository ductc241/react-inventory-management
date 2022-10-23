import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hook/hook";
import { logOut } from "../../store/slice/auth.slice";
import "./Header.styles.css";

const Header = () => {
  const disPatch = useAppDispatch();
  const navigate = useNavigate();
  const hanleLogOut = () => {
    disPatch(logOut);
    navigate("/signin");
  };
  return (
    <div>
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-[#00263a] text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link to="/" className="w-20">
                <img
                  src="https://res.cloudinary.com/dsirnbuyv/image/upload/v1664895627/poly_wareh_j06pfe.png"
                  alt=""
                  width="90px"
                />
              </Link>
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
                        <Link to="/import_shipments">Nhập hàng</Link>
                      </li>
                      <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                        Trả hàng nhập
                      </li>
                      <li className="rounded-sm px-3 py-1 hover:text-sky-700">
                        <Link to="#">Xuất huỷ</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="group inline-block">
                    <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                      <span className="pr-1 font-semibold flex-1">Đối tác</span>
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
                      <span className="pr-1 font-semibold flex-1">Số quỹ</span>
                    </ul>
                  </div>
                </li>
              </ul>
              {/* Header Icons */}
              <div className="hidden xl:flex space-x-5 items-center">
                <Link className="flex items-center hover:text-gray-200" to="#">
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

                <div className="group inline-block">
                  <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
                    <span className="pr-1 font-semibold flex-1">
                      <Link
                        className="flex items-center hover:text-gray-200"
                        to="#"
                      >
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
                      </Link>
                    </span>
                  </ul>
                  <ul
                    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-40 py-2 drop-shadow-xl -ml-28"
                  >
                    <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
                      <Link to="/signup">Tài khoản</Link>
                    </li>
                    <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
                      <button onClick={hanleLogOut}>Đăng xuất</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Responsive navbar */}
            <a className="navbar-burger self-center mr-12 xl:hidden">
              <button
                type="button"
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
                      <Link to="/home">Tổng quan</Link>
                    </li>
                    <li>
                      <Link to="#">Hàng hoá</Link>
                      <p id="menu_children">
                        <Link to="#">Danh mục</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Thiết lập giá</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Phiếu bảo hành</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Kiểm kho</Link>
                      </p>
                    </li>
                    <li>
                      <Link to="#">Giao dịch</Link>
                      <p id="menu_children">
                        <Link to="#">Đơn đặt</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Hoá đơn</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Vận đơn</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Trả hàng</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="/import_shipments">Nhập hàng</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="/import_shipments">Trả hàng nhập</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Xuất huỷ</Link>
                      </p>
                    </li>
                    <li>
                      <Link to="#">Đối tác</Link>
                      <p id="menu_children">
                        <Link to="#">Khách hàng</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Nhà cung cấp</Link>
                      </p>
                      <p id="menu_children">
                        <Link to="#">Đối tác</Link>
                      </p>
                    </li>
                    <li>
                      <Link to="#">Số quỹ</Link>
                    </li>
                  </ul>
                </div>
              </button>
            </a>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Header;
