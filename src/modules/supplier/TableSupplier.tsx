import { useState } from "react";
import { Modal, Table } from "../../components";
import Button from "../../components/Button/Button";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";

import FormSupplier from "./FormSupplier";

type ISupplier = {
  id: number;
  supplierName?: string;
  email?: string;
  phone?: string;
  address?: string;
};
const TableSupplier = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setvisibleModal] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const update = (item: any) => {
    setData([...data, item]);
  };
  const [itemUpdate, setItemUpdate] = useState<any>([]);
  const [id, setId] = useState<number>();
  const itemEdit = async (id: number) => {
    const item = data.filter((item: ISupplier) => item.id == id);
    await setItemUpdate(item);
    setVisible(true);
  };
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Nhà cung cấp",

      dataIndex: "supplierName"
    },
    {
      key: 2,
      title: "Email",
      dataIndex: "email"
    },
    {
      key: 3,
      title: "Điện thoại",
      dataIndex: "phone"
    },
    {
      key: 4,
      title: "Địa chỉ",
      dataIndex: "address"
    },
    {
      key: 5,
      title: "Action",
      dataIndex: "action",
      render: (item: ISupplier) => (
        <div className="flex gap-x-5">
          <EditIcon
            className="cursor-pointer fill-blue-400 hover:fill-blue-600"
            width={20}
            onClick={() => itemEdit(item.id)}
          />
          <TrashIcon
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
            onClick={() => {
              setvisibleModal(true);
              setId(item.id);
            }}
          />
        </div>
      )
    }
  ];

  const remove = () => {
    const newData: any = [];
    data.map((item: any) => {
      if (item.id != id) {
        newData.push(item);
      }
    });
    setData(newData);
    setvisibleModal(false);
  };

  const updateItemUpdate = (e: ISupplier) => {
    data.forEach((element: ISupplier) => {
      if (element.id == e.id) {
        element.id = e.id;
        element.supplierName = e.supplierName;
        element.phone = e.phone;
        element.email = e.email;
        element.address = e.address;
      }
    });
    setData(data);
    setItemUpdate([]);
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button onClick={() => setVisible(true)}>Thêm nhà cung cấp</Button>
      </div>
      <Table dataSource={data} column={columns} />
      <FormSupplier
        hidenModal={visible}
        upload={(e: boolean) => setVisible(e)}
        uploadData={(e: any) => {
          update(e);
        }}
        data={data}
        itemUpdate={itemUpdate}
        uploadItemUpdate={(e: ISupplier) => {
          updateItemUpdate(e);
        }}
      />
      <Modal
        visible={visibleModal}
        title="Xác Nhận"
        content="bạn có muốn xóa hay không ?"
        onCancel={() => setvisibleModal(false)}
        onOk={() => {
          remove();
        }}
      />
    </>
  );
};

export default TableSupplier;
