import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import productServices from "../../api/product.api";

import { Table, Modal, Button, TextField } from "../../components";
import { EditIcon, TrashIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { IProduct } from "../../types/product.type";
import { isAuthenticated } from "../../utils/localStorage/localStorega";
import ProductInforTab from "./ProductInforTab";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showInforTab, setShowInforTab] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<number>(0);

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Mã hàng",
      dataIndex: "sku"
    },
    {
      key: 2,
      title: "Tên hàng",
      dataIndex: "name",
      render: (record: IProduct) => (
        <p
          className="hover:cursor-pointer hover:text-blue-500"
          onClick={() => {
            setShowInforTab(true), setCurrentProduct(record.id);
          }}
        >
          {record.name}
        </p>
      )
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
          <Link to={`update/${record.id}`}>
            <EditIcon
              className="cursor-pointer fill-green-400 hover:fill-green-600"
              width={20}
              onClick={() => {
                setShowInforTab(true), setCurrentProduct(record.id);
              }}
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
  const user = isAuthenticated();

  useEffect(() => {
    productServices.getProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="relative">
      <p className="mb-5 text-xl font-semibold uppercase">Danh sách sản phẩm</p>

      <div className="flex justify-between mb-5">
        <div className="flex gap-x-5">
          <TextField name="filterName" placeholder="Tên sản phẩm ...." />
          <TextField name="filterCategory" placeholder="Tên danh mục ...." />
        </div>

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

      {showInforTab && (
        <ProductInforTab id={currentProduct} closeTab={setShowInforTab} />
      )}

      <Modal
        visible={false}
        title="Xác nhận"
        content="Bạn có muốn ẩn sản phẩm này không ?"
      />
    </div>
  );
};

export default ProductList;
