import { useEffect, useState } from "react";
import { list } from "../../api/receipt.api";
import { Modal, Table } from "../../components";
import Button from "../../components/Button/Button";
import { ITableColumn } from "../../components/Table/Table.types";

const TableReceipt = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setvisibleModal] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const getSupplier = async () => {
    try {
      const { data } = await list();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSupplier();
  }, []);
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Mã hóa dơn",
      dataIndex: "codeBill"
    },
    {
      key: 2,
      title: "Thời gian",
      dataIndex: "Time"
    },
    {
      key: 3,
      title: "Mã trả hàng",
      dataIndex: "PayingCode"
    },
    {
      key: 4,
      title: "Khách hàng",
      dataIndex: "Client"
    },
    {
      key: 5,
      title: "Tổng tiền hàng",
      dataIndex: "TotalAmount"
    },
    {
      key: 6,
      title: "Giảm giá",
      dataIndex: "Discount"
    },
    {
      key: 7,
      title: "Khách hàng đã trả",
      dataIndex: "CustomerPaid"
    }

    // {
    //   key: 5,
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (item: ISupplier) => (
    //     <div className="flex gap-x-5">
    //       <EditIcon
    //         className="cursor-pointer fill-blue-400 hover:fill-blue-600"
    //         width={20}
    //         onClick={() => itemEdit(item.id)}
    //       />
    //       <TrashIcon
    //         className="cursor-pointer fill-red-400 hover:fill-red-600"
    //         width={20}
    //         onClick={() => {
    //           setvisibleModal(true);
    //           setId(item.id);
    //         }}
    //       />
    //     </div>
    //   )
    // }
  ];
  console.log(data);
  return (
    <>
      <Table dataSource={data} column={columns} link={true} />
    </>
  );
};

export default TableReceipt;
