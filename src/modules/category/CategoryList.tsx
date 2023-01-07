import { Table, Button } from "../../components";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { useEffect, useState } from "react";
import ModalRemoveUser from "../user/modalRemoveUser";
import { listCategoryAPI } from "../../api/category";
import { CategoryAction } from "../../types/category.type";
import CategoryForm from "./CategoryForm/CategoryForm";

// const CategoryList = () => {
//   const categorys = useSelector((state: any) => state.category?.categorys);
//   const dispatch = useDispatch<any>();
//   useEffect(() => {
//     dispatch(listCategory());
//     // console.log(categorys);
//   }, [dispatch]);
//   const navigate = useNavigate();

//   const onRemove = (id: number) => {
//     if (confirm("Bạn chắc chắn muốn xoá?")) {
//       dispatch(removeCategory(id));
//       try {
//         toast.success("Xoá nhóm hàng thành công!");
//         navigate("/category");
//       } catch (error) {
//         toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
//       }
//     }
//   };

//   const columns: ITableColumn[] = [
//     {
//       key: "id",
//       title: "ID",
//       dataIndex: "id"
//     },
//     {
//       key: "name",
//       title: "Tên nhóm hàng",
//       dataIndex: "name"
//     },
//     {
//       key: "action",
//       title: "Action",
//       dataIndex: "action",
//       render: (item) => (
//         <div className="flex gap-x-5">
//           <Link to={`update/${item.id}`}>
//             <EditIcon
//               className="cursor-pointer fill-green-400 hover:fill-green-600"
//               width={20}
//             />
//           </Link>

//           <TrashIcon
//             onClick={() => onRemove(item.id)}
//             className="cursor-pointer fill-red-400 hover:fill-red-600"
//             width={20}
//           />
//         </div>
//       )
//     }
//   ];
//   return (
//     <>
//       {/* {categorys?.map((item: any) => {
//       return (
//         <Table
//         dataSource={dataSource}
//         column={columns} />
//       )
//     })} */}
//       <div className="flex justify-end mb-5">
//         <Link to="/category/add" className="contents">
//           <Button>Thêm nhóm hàng</Button>
//         </Link>
//       </div>
//       <Table dataSource={categorys} column={columns} />
//       {/* <Table dataSource={dataSource} column={columns} /> */}

//       <ReactPaginate
//         pageCount={10}
//         containerClassName="pagination mt-5"
//         pageClassName="pagination_item"
//         activeClassName="pagination_active"
//         previousLabel={<Caret width={"15px"} />}
//         nextLabel={<Caret className="rotate-180" width={"15px"} />}
//       />
//     </>
//   );
// };

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
      key: 1,
      title: "Tên hàng hoá",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Nhóm",
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
              onClick={() =>
                handleClickOpenModal(CategoryAction.EDIT, records.id)
              }
            />
            <TrashIcon onClick={() => handleClickOpenModalDelete(records.id)} />
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
