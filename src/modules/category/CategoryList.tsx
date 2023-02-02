import { Table, Button } from "../../components";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { useEffect, useState } from "react";
import ModalRemoveUser from "../user/modalRemoveUser";
import { listCategoryAPI } from "../../api/category";
import { CategoryAction } from "../../types/category.type";
import CategoryForm from "./CategoryForm/CategoryForm";

const CategoryList = () => {
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
      key: 0,
      title: "Mã",
      dataIndex: "id"
    },
    {
      key: 1,
      title: "Tên hàng hoá",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Nhóm cha",
      dataIndex: "parent_id"
    },
    {
      key: 3,
      title: "Action",
      dataIndex: "",
      render: (records) => {
        return (
          <div className="flex items-center gap-5 justify-center">
            <EditIcon
              className="cursor-pointer fill-green-400 hover:fill-green-600"
              onClick={() =>
                handleClickOpenModal(CategoryAction.EDIT, records.id)
              }
            />
            <TrashIcon
              className="cursor-pointer fill-red-400 hover:fill-red-600"
              onClick={() => handleClickOpenModalDelete(records.id)}
            />
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
      <div className="flex justify-between items-center mb-10">
        <p className="text-xl font-semibold uppercase">Danh sách sản phẩm</p>
        <Button onClick={() => handleClickOpenModal(CategoryAction.ADD)}>
          Thêm danh mục
        </Button>
      </div>
      <Table column={column} dataSource={listCategory ? listCategory : []} />
      <CategoryForm
        open={isOpenModalAddEdit}
        close={handleClose}
        typeCate={typeModal}
        id={id}
        getAllCate={listCategoryAPI}
      />
      <ModalRemoveUser
        getAllUser={listCategoryAPI}
        isOpenModalDelete={isOpenModalDelete}
        close={handleCloseModalDelete}
        id={idRemove}
      />
    </div>
  );
};

export default CategoryList;
