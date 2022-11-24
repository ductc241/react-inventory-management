import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { listRecei } from "../../api/receipt.api";
import { list } from "../../api/supplier.api";
import { Modal, Table } from "../../components";
import Button from "../../components/Button/Button";
import { ITableColumn } from "../../components/Table/Table.types";

type Props = {
  data?: any;
};

type Inputs = {
  supplierCode: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  taxCode: string;
  area: string;
  group: string;
  wards: string;
  note: string;
};

const TableReceipt = (props: Props) => {
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "ID",
      dataIndex: "id"
    },
    {
      key: 2,
      title: "Ngày",
      dataIndex: "export_date"
    },
    {
      key: 3,
      title: "Loại ",
      dataIndex: ""
    },
    {
      key: 4,
      title: " Số điện thoại",
      dataIndex: "receve_phone"
    },
    {
      key: 5,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 6,
      title: "Tổng tiền",
      dataIndex: "totall_price"
    },
    {
      key: 7,
      title: "Người tạo",
      dataIndex: "user_name"
    },
    {
      key: 8,
      title: "Ghi chú",
      dataIndex: ""
    }
  ];

  return (
    <>
      <Table dataSource={props?.data} column={columns} link={true} />
    </>
  );
};

export default TableReceipt;
