import { Table, Button } from "../../components";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { useEffect, useState } from "react";
import ModalRemoveUser from "../user/modalRemoveUser";
import { listCategoryAPI } from "../../api/category";
import { CategoryAction } from "../../types/category.type";


const Returns = () => {
  const [listCategory, setListCategory] = useState([]);
  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [typeModal, setTypeModal] = useState(CategoryAction.ADD);
  const [id, setID] = useState();
  const [idRemove, setIDRemove] = useState();

  const getAllCategory = async () => {
    const res = await listCategoryAPI();
    if (res.status === 200) {
      setListCategory(res.data.data);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleClickOpenModal = (type: CategoryAction, id?: any) => {
    if (id) {
      setID(id);
    }
    setTypeModal(type);
    setIsOpenModalAddEdit((prev) => !prev);
  };

  const handleClickOpenModalDelete = (id: any) => {
    if (id) {
      setIDRemove(id);
    }
    setIsOpenModalDelete((prev) => !prev);
  };

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  const column: ITableColumn[] = [
    {
      key: 1,
      title: "Id",
      dataIndex: "id"
    }, 
    {
      key: 2,
      title: "Người trả",
      dataIndex: "seller_name"
    },
    {
      key: 3,
      title: "Mã hoàn",
      dataIndex: "refund_code"
    },
    {
      key: 4,
      title: "Tên hoàn",
      dataIndex: "description"
    },
    {
      key: 5,
      title: "Số lượng",
      dataIndex: "refund_totall_quantity"
    },
    {
      key: 6,
      title: "Trạng thái ($)",
      dataIndex: "refund_totall_quantity"
    },
    {
      key: 7,
      title: "Action",
      dataIndex: "",
      render: (records) => {
        return (
          <div className="flex items-center gap-5 justify-center">
            <EditIcon className="cursor-pointer fill-green-400 hover:fill-green-600"
              onClick={() =>
                handleClickOpenModal(CategoryAction.EDIT, records.id)
              }
            />
            <TrashIcon className="cursor-pointer fill-red-400 hover:fill-red-600"
              onClick={() => handleClickOpenModalDelete(records.id)} />
          </div>
        );
      }
    }
  ];

  const handleClose = () => {
    setIsOpenModalAddEdit(false);
  };
  return (
    <div>
      <div className="flex justify-between mb-3">
        <span className="text-3xl font-semibold mb-10 inline-block">
          Hàng Hoá
        </span>
        <Button
          className="h-16"
          onClick={() => handleClickOpenModal(CategoryAction.ADD)}
        >
          Thêm nhân viên
        </Button>
      </div>
      <Table column={column} dataSource={listCategory ? listCategory : []} />
      <ModalRemoveUser
        getAllUser={listCategoryAPI}
        isOpenModalDelete={isOpenModalDelete}
        close={handleCloseModalDelete}
        id={idRemove}
      />
    </div>
  );
};

export default Returns;
