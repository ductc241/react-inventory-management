import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import productServices from "../../api/product.api";

import { Table, Modal, Button } from "../../components";
import { Caret, EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { IProduct } from "../../types/product.type";
import { isAuthenticated } from "../../utils/localStorage/localStorega";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Mã hàng",
      dataIndex: "sku"
    },
    {
      key: 2,
      title: "Tên hàng",
      dataIndex: "name"
    },
    {
      key: 3,
      title: "Giá bán",
      dataIndex: "price"
    },
    {
      key: 4,
      title: "Giá vốn",
      dataIndex: "import_price"
    },
    {
      key: 5,
      title: "Tồn kho",
      dataIndex: "quantity"
    },
    {
      key: 6,
      title: "Action",
      dataIndex: "action",
      render: (record: IProduct) => (
        <div className="flex gap-x-5">
          <Link to="/products/update/1">
            <EditIcon
              className="cursor-pointer fill-green-400 hover:fill-green-600"
              width={22}
              onClick={() => navigate(`update/${record.id}`)}
            />
          </Link>
          <TrashIcon
            className="cursor-pointer fill-red-400 hover:fill-red-600"
            width={20}
          />
        </div>
      )
    }
  ];

  useEffect(() => {
    productServices.getProducts().then(({ data }) => {
      setProducts(data.data);
    });
  }, []);
  const user = isAuthenticated();
  return (
    <>
      <div className="flex justify-end mb-5">
        {user.role_id === 1 ? (
          <Link to="/products/add" className="contents">
            <Button>Thêm sản phẩm</Button>
          </Link>
        ) : (
          <div
            onClick={() => toast.error("bạn không có quyền ")}
            className="contents"
          >
            <Button>Thêm sản phẩm</Button>
          </div>
        )}
      </div>

      <Table dataSource={products} column={columns} />

      <ReactPaginate
        pageCount={10}
        containerClassName="pagination mt-5"
        pageClassName="pagination_item"
        activeClassName="pagination_active"
        previousLabel={<Caret width={"15px"} />}
        nextLabel={<Caret className="rotate-180" width={"15px"} />}
      />

      <Modal
        visible={false}
        title="Xác nhận"
        content="Bạn có muốn ẩn sản phẩm này không ?"
      />
    </>
  );
};

export default ProductList;
