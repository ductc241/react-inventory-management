import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownIcon,
  BoxIcon,
  InventoryIcon,
  OverviewIcon,
  ReportIcon,
  ShoppingIcon,
  UsersIcon
} from "../components/icons";
import * as routerPaths from "../routes/routes.paths";
import Logo from "../assets/logo.png";
import clsx from "clsx";

const LayoutSidebar = () => {
  const [product, setProduct] = useState<boolean>(true);
  const [store, setStore] = useState<boolean>(true);
  const [report, setReport] = useState<boolean>(true);

  return (
    <div className="w-[81px] h-full xl:w-[260px] bg-[#233044]">
      <div className="pt-5 pb-7">
        <Link to="" className="flex justify-center">
          <img src={Logo} alt="" className="w-[40px] xl:w-[80px]" />
        </Link>
      </div>

      <div>
        <div className="mb-2 py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer">
          <Link to="" className="flex items-center justify-center">
            <OverviewIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Tổng quan</span>
            </div>
          </Link>
        </div>

        <div className="mb-2">
          <div
            className="flex items-center justify-center py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer"
            onClick={() => setProduct((prev) => !prev)}
          >
            <BoxIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Sản phẩm</span>
              <ArrowDownIcon
                fill="#eeeeee"
                width={18}
                height={18}
                className={clsx("duration-150", product && "rotate-180")}
              />
            </div>
          </div>

          {product && (
            <div className="text-[14px] mobile-hidden">
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_PRODUCTS}
                  className="text-[#eeeeeeb3]"
                >
                  Sản phẩm
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_CATEGORY}
                  className="text-[#eeeeeeb3]"
                >
                  Danh mục
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_SUPPLIER}
                  className="text-[#eeeeeeb3]"
                >
                  Đối tác
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mb-2">
          <div
            className="flex items-center justify-center py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer"
            onClick={() => setStore((prev) => !prev)}
          >
            <InventoryIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Kho hàng</span>
              <ArrowDownIcon
                fill="#eeeeee"
                width={18}
                height={18}
                className={clsx("duration-150", store && "rotate-180")}
              />
            </div>
          </div>

          {store && (
            <div className="text-[14px] mobile-hidden">
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_RECEIPT}
                  className="text-[#eeeeeeb3]"
                >
                  Xuất, nhập kho
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_REFUND_SUPPLIER}
                  className="text-[#eeeeeeb3]"
                >
                  Trả hàng
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to={routerPaths.PATH_PRODUCT_BROKEN}
                  className="text-[#eeeeeeb3]"
                >
                  Hàng lỗi
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link to="inventory/storage-time" className="text-[#eeeeeeb3]">
                  Thời gian lưu kho
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link to="#" className="text-[#eeeeeeb3]">
                  Hạn mức tồn kho
                </Link>
              </div>
              <div className="py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <Link
                  to="inventory/forcasting-import"
                  className="text-[#eeeeeeb3]"
                >
                  Dự báo nhập hàng
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mb-2 py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer">
          <Link to="retail/new" className="flex items-center justify-center">
            <ShoppingIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Bán hàng</span>
            </div>
          </Link>
        </div>

        <div className="mb-2">
          <div
            className="flex items-center justify-center py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer"
            onClick={() => setReport((prev) => !prev)}
          >
            <ReportIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Báo cáo</span>
              <ArrowDownIcon
                fill="#eeeeee"
                width={18}
                height={18}
                className={clsx("duration-150", report && "rotate-180")}
              />
            </div>
          </div>
          {report && (
            <div className="text-[14px] mobile-hidden">
              <div className="menu-item relative py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <span className="text-[#eeeeeeb3]">Doanh thu</span>
                <div className="menu-item-sub absolute z-[999] top-0 left-[100%] border border-l-white w-[260px] bg-[#233044] text-white">
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_REVENUE}>Tổng quan</Link>
                  </div>
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_REVENUE_PRODUCT}>
                      Theo sản phẩm
                    </Link>
                  </div>
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_REVENUE_SUPPLIER}>
                      Theo nhà cung cấp
                    </Link>
                  </div>
                </div>
              </div>

              <div className="menu-item relative py-3 pr-8 pl-[75px] hover:bg-[#00000038] hover:cursor-pointer">
                <span className="text-[#eeeeeeb3]">Tồn kho</span>
                <div className="menu-item-sub absolute z-[999] top-0 left-[100%] border border-l-white w-[260px] bg-[#233044] text-white">
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_INVENTORY_PRODUCT}>
                      Theo sản phẩm
                    </Link>
                  </div>
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_INVENTORY_SUPPLIER}>
                      Theo nhà cung cấp
                    </Link>
                  </div>
                  <div className="py-3 px-5 hover:bg-slate-700">
                    <Link to={routerPaths.PATH_REPORT_REVENUE_PRODUCT}>
                      Theo danh mục sản phẩm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-2 py-3 px-7 xl:px-8 hover:bg-[#00000038] hover:cursor-pointer">
          <Link
            to={routerPaths.PATH_ALL_USER}
            className="flex items-center justify-center"
          >
            <UsersIcon width={17} height={17} fill="#eeeeee" />
            <div className="flex grow mobile-hidden">
              <span className="grow px-5 text-[#eeeeee]">Nhân viên</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayoutSidebar;
