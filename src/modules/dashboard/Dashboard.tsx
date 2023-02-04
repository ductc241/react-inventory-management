import axios from "axios";
import React, { useEffect, useState } from "react";
import reportServices from "../../api/report.api";
import FormatNumber from "../../components/formatNumber/formatNumber";
import BanChay from "./BanChay";
import HangHoanTra from "./HangHoanTra";
import KhachHang from "./KhachHang";
import SpTrongKho from "./SpTrongKho";

const Dashboard = () => {
  const [data, setData] = useState<any | []>([]);
  useEffect(() => {
    const handleStaticCall = async () => {
      const { data } = await reportServices.getRevenueOverview();

      setData(data);
    };
    handleStaticCall();
  }, []);
  return (
    <div>
      <div>
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-green-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-green-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-green-800 duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">557</p>
              <p>Thống kê sản phẩm trong kho</p>
            </div>
          </div>
          <div className="bg-rose-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-rose-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-rose-800 duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">
                22.520.500 <span className="font-mono">VNĐ</span>
              </p>
              <p>Tiền lãi</p>
            </div>
          </div>
          <div className="bg-yellow-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-yellow-800 duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">
                <FormatNumber number={data?.funds} />
                <span className="font-mono pl-1">VNĐ</span>
              </p>
              <p>Tiền vốn</p>
            </div>
          </div>
          <div className="bg-blue-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">6</p>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>

        {/* Thống kê sản phẩm trong kho */}
        <SpTrongKho data={data?.most_profitable_products} />

        {/* Đồ thị tiền tệ */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4 mt-6">
          <TienLai />
          <TienVon />
          <TienLo />
        </div> */}

        {/* Sản phẩm bán chạy & Hàng hoàn trả */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <BanChay data={data?.best_selling_products} />
          <HangHoanTra />
        </div>

        {/* Khách hàng trong tháng */}
        {/* <KhachHang /> */}
      </div>
    </div>
  );
};

export default Dashboard;
