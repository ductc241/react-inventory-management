import { useEffect, useState } from "react";
import { getAllUserApi } from "../../api/user.api";
import { Button, Table } from "../../components";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { UserAction } from "../../types/user.type";
import FornAction from "./formAction";
import ModalRemoveUser from "./modalRemoveUser";

const User = () => {
  const [listUser, setListUser] = useState([]);
  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [typeModal, setTypeModal] = useState(UserAction.ADD);
  const [id, setID] = useState();
  const [idRemove, setIDRemove] = useState();

  const getAllUser = async () => {
    const res = await getAllUserApi();
    if (res.status === 200) {
      setListUser(res.data.data);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  const handleClickOpenModal = (type: UserAction, id?: any) => {
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
      title: "Tên người dùng",
      dataIndex: "name"
    },
    {
      key: 6,
      title: "Chức vụ",
      dataIndex: "",
      render: (record) => {
        return <div>{record.role_id === 1 ? "Admin" : "Nhân viên"}</div>;
      }
    },
    {
      key: 2,
      title: "Email",
      dataIndex: "email"
    },
    {
      key: 3,
      title: "Số điện thoại",
      dataIndex: "phone_number"
    },
    {
      key: 4,
      title: "Kích hoạt tài khoản",
      dataIndex: "status",
      render: (record) => {
        return (
          <div>{record.status === 1 ? "Đã kích hoạt" : "chưa kích hoạt"}</div>
        );
      }
    },
    {
      key: 5,
      title: "Action",
      dataIndex: "",
      render: (record) => {
        return (
          <div className="flex items-center gap-5 justify-center">
            <EditIcon
              onClick={() => handleClickOpenModal(UserAction.EDIT, record.id)}
            />
            <TrashIcon onClick={() => handleClickOpenModalDelete(record.id)} />
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
          Nhân viên
        </span>
        <Button
          className="h-16"
          onClick={() => handleClickOpenModal(UserAction.ADD)}
        >
          Thêm nhân viên
        </Button>
      </div>
      <Table column={column} dataSource={listUser ? listUser : []} />
      <FornAction
        open={isOpenModalAddEdit}
        close={handleClose}
        type={typeModal}
        id={id}
        getAllUser={getAllUser}
      />
      <ModalRemoveUser
        getAllUser={getAllUser}
        isOpenModalDelete={isOpenModalDelete}
        close={handleCloseModalDelete}
        id={idRemove}
      />
    </div>
  );
};

export default User;
