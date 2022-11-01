import { Table, Button } from "../../components";
import ReactPaginate from "react-paginate";
import { Caret, EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listCategory, removeCategory } from "../../store/slice/category.slice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




const CategoryList = () => {

  const categorys = useSelector((state: any) => state.category.categorys)
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(listCategory())
    console.log(categorys)
  }, [dispatch])
  const navigate = useNavigate();

  const onRemove = (id: number) => {
    if (confirm("Bạn chắc chắn muốn xoá?")) {
      dispatch(removeCategory(id))
      try {
        toast.success("Xoá nhóm hàng thành công!", {
          onClose: () => {
          }
        });
        navigate("/category");


      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");

      }
    }
  }

  const columns: ITableColumn[] = [
    {
      key: 'id',
      title: "ID",
      dataIndex: "id"
    },
    {
      key: 'name',
      title: "Tên nhóm hàng",
      dataIndex: "name"
    },
    {
      key: 'action',
      title: "Action",
      dataIndex: "action",
      render: (item) => (
        <div className="flex gap-x-5">
          
          <Link to={`update/${item.id}`}>
            <EditIcon

              className="cursor-pointer fill-green-400 hover:fill-green-600"
              width={20}
            />
          </Link>

          <TrashIcon
            onClick={() => onRemove(item.id)}
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
          />
        </div>
      )
    }
  ];
  return (
    <>
      {/* {categorys?.map((item: any) => {
      return (
        <Table 
        dataSource={dataSource}
        column={columns} />
      )
    })} */}
      <div className="flex justify-end mb-5">
        <Link to="/category/add" className="contents">
          <Button>Thêm nhóm hàng</Button>
        </Link>
      </div>
      <Table
        dataSource={categorys}
        column={columns} />
      {/* <Table dataSource={dataSource} column={columns} /> */}

      <ReactPaginate
        pageCount={10}
        containerClassName="pagination mt-5"
        pageClassName="pagination_item"
        activeClassName="pagination_active"
        previousLabel={<Caret width={"15px"} />}
        nextLabel={<Caret className="rotate-180" width={"15px"} />}
      />
    </>
  );
};

export default CategoryList;
