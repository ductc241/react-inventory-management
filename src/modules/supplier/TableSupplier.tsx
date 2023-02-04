import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { add, list, remove, update } from "../../api/supplier.api";
import { Modal, Table } from "../../components";
import Button from "../../components/Button/Button";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { ISupplier } from "../../types/supplier.type";
import { isAuthenticated } from "../../utils/localStorage/localStorega";

import FormSupplier from "./FormSupplier";

const TableSupplier = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setvisibleModal] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [itemUpdate, setItemUpdate] = useState<any>([]);
  const [id, setId] = useState<number>();
  const [itemAdd, setItemAdd] = useState<any>();
  const user = isAuthenticated();

  const itemEdit = async (id: number) => {
    const item = data.filter((item: ISupplier) => item.id == id);
    setItemUpdate(item);
    setVisible(true);
  };

  const getSupplier = async () => {
    try {
      const { data } = await list();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSupplier = async (item: ISupplier) => {
    await add(item);
    setItemAdd(item == itemAdd ? null : item);
  };

  useEffect(() => {
    getSupplier();
  }, [itemAdd, id, itemUpdate]);

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Nhà cung cấp",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Địa chỉ",
      dataIndex: "address"
    },
    {
      key: 3,
      title: "Action",
      dataIndex: "action",
      render: (item: ISupplier) => (
        <div className="flex justify-center gap-x-5">
          <EditIcon
            className="cursor-pointer fill-blue-400 hover:fill-blue-600"
            width={20}
            onClick={() => {
              if (user.role_id === 2) {
                itemEdit(item.id);
              } else {
                toast.error("bạn không có quyền sửa?");
              }
            }}
          />
          <TrashIcon
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
            onClick={() => {
              if (user.role_id === 2) {
                setvisibleModal(true);
                setId(item.id);
              } else {
                toast.error("bạn không có quyền xóa?");
              }
            }}
          />
        </div>
      )
    }
  ];

  const removeSupplier = async () => {
    await remove(id != undefined ? id : 0);
    setId(0);
    setvisibleModal(false);
  };

  const updateItemUpdate = async (e: ISupplier | null) => {
    if (e != null) {
      await update(e);
    }
    setItemUpdate([]);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <p className="text-xl font-semibold uppercase">
          Danh sách nhà cung cấp
        </p>
        <Button
          onClick={() => {
            user.role_id === 2
              ? setVisible(true)
              : toast.error(
                  "Bạn không phải là chủ cửa hàng nên ko thể thêm nhà cung cấp"
                );
          }}
        >
          Thêm nhà cung cấp
        </Button>
      </div>

      <Table dataSource={data} column={columns} />
      <FormSupplier
        hidenModal={visible}
        upload={(e: boolean) => {
          setVisible(e);
          setvisibleModal(e);
        }}
        uploadData={(e: any) => {
          addSupplier(e);
        }}
        data={data}
        itemUpdate={itemUpdate}
        uploadItemUpdate={(e: ISupplier | null) => {
          updateItemUpdate(e);
        }}
      />

      <Modal
        visible={visibleModal}
        title="Xác Nhận"
        content="bạn có muốn xóa hay không ?"
        onCancel={() => setvisibleModal(false)}
        onOk={() => {
          removeSupplier();
        }}
      />
    </>
  );
};

export default TableSupplier;
