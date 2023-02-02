import React from "react";
import { Button, Select, Table, TextField } from "../../../../components";
import { ITableColumn } from "../../../../components/Table/Table.types";
import { METHOD_TYPE } from "./forecast.constants";

const ForecastImport = () => {
  const StaticalColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Tên sản phẩm",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "SL bán năm trước",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Trung bình năm trước",
      dataIndex: "name"
    },
    {
      key: 3,
      title: "Sl bán hiện tại",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Trung bình hiện tại",
      dataIndex: "name"
    },
    {
      key: 4,
      title: "Chênh lệch",
      dataIndex: "name"
    }
  ];
  const ForecastNowColumn: ITableColumn[] = [];

  return (
    <>
      <p className="mb-5 text-xl font-semibold uppercase">Dự báo nhập hàng</p>

      <div className="mb-10 flex gap-x-10">
        <div className="flex items-center">
          <p className="mr-5">Lọc theo ngày</p>
          <TextField type="date" name="date-start" className="rounded-r-none" />
          <TextField type="date" name="date-end" className="rounded-l-none" />
        </div>

        <div className="flex items-center">
          <p className="mr-5">Danh mục</p>
          <Select
            options={METHOD_TYPE}
            handleClickChange={(value) => console.log(value)}
            containerClass="w-[250px]"
          />
        </div>

        <div className="flex items-center">
          <p className="mr-5">Sản phẩm</p>
          <TextField name="name" />
        </div>

        <Button>Lọc</Button>
      </div>

      <div className="mb-10">
        <p className="mb-5 text-[16px] font-semibold uppercase">
          Thống kê số lượng xuất trong khoảng thời gian
        </p>

        <Table column={StaticalColumn} dataSource={[]} />
      </div>

      <div className="mb-10">
        <p className="mb-5 text-[16px] font-semibold uppercase">
          Dự báo số lượng sẽ nhập theo ngày hiện tại
        </p>
      </div>
    </>
  );
};

export default ForecastImport;
