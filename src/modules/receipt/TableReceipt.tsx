import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { listRecei } from "../../api/receipt.api";
import { list } from "../../api/supplier.api";
import { Modal, Table } from "../../components";
import Button from "../../components/Button/Button";
import { ITableColumn } from "../../components/Table/Table.types";

type Props = {
  visible?: boolean;
  updateVisible?: (e: boolean) => void;
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
  const [data, setData] = useState<any>([]);

  const getReceipt = async () => {
    try {
      const { data } = await listRecei();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReceipt();
  }, []);

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "ID",
      dataIndex: "codeBill"
    },
    {
      key: 2,
      title: "Ngày",
      dataIndex: "Time"
    },
    {
      key: 3,
      title: "Kho hàng",
      dataIndex: "Kho hàng"
    },
    {
      key: 4,
      title: "Sản phẩm",
      dataIndex: "Client"
    },
    {
      key: 5,
      title: "Số lượng",
      dataIndex: "TotalAmount"
    },
    {
      key: 6,
      title: "Tổng tiền",
      dataIndex: "Discount"
    },
    {
      key: 7,
      title: "Người tạo",
      dataIndex: "CustomerPaid"
    }
  ];

  return (
    <>
      List Table
      {/* <Table dataSource={data} column={columns} link={true} /> */}
    </>
  );
};

export default TableReceipt;
