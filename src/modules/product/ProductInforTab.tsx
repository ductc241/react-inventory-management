import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import productServices from "../../api/product.api";
import { Select, Table } from "../../components";
import { CloseIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import IOption from "../../types/option.model";
import { IProduct } from "../../types/product.type";
import { numberWithCommas } from "../../utils/funtion";

interface IProps {
  id: number;
  closeTab: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProductLot {
  id: number;
  product_id: number;
  quantity: number;
  import_price: number;
  lot_code: string;
}

const selectValue: IOption[] = [
  { label: "Nhập", value: "import" },
  { label: "Xuất", value: "export" }
];

const ProductInforTab = ({ id, closeTab }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>("infor");
  const [option, setOption] = useState<IOption>(selectValue[0]);
  const [product, setProduct] = useState<IProduct>();

  const [productLot, setProductLot] = useState<IProductLot[]>([]);
  const [importBill, setImportBill] = useState<any[]>([]);
  const [exportBill, setExportBill] = useState<any[]>([]);

  const ProductLotColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Mã lô",
      dataIndex: "lot_code"
    },
    {
      key: 2,
      title: "Ngày",
      dataIndex: "lot_code",
      render: (record: IProductLot) => <p>{record.lot_code.slice(5)}</p>
    },
    {
      key: 3,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Giá nhập",
      dataIndex: "import_price"
    },
    {
      key: 5,
      title: "Tổng vốn",
      dataIndex: "import_price",
      render: (record: IProductLot) => (
        <p>{numberWithCommas(record.quantity * record.import_price)}</p>
      )
    }
  ];

  const importColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Mã lô",
      dataIndex: "lot_code"
    },
    {
      key: 2,
      title: "Ngày nhập",
      dataIndex: "lot_code",
      render: (item) => <p>{item.lot_code.slice(5)}</p>
    },
    {
      key: 3,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Giá nhập",
      dataIndex: "import_price",
      render: (item) => <p>{numberWithCommas(item.import_price)}</p>
    },
    {
      key: 2,
      title: "Tổng vốn",
      dataIndex: "price",
      render: (item) => (
        <p>{numberWithCommas(item.import_price * item.quantity)}</p>
      )
    }
  ];

  const exportColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Mã lô",
      dataIndex: "lot_code"
    },
    {
      key: 2,
      title: "Ngày xuất",
      dataIndex: "lot_code"
    },
    {
      key: 3,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Giá xuất",
      dataIndex: "price",
      render: (item) => <p>{numberWithCommas(item.price)}</p>
    },
    {
      key: 4,
      title: "Doanh thu",
      dataIndex: "price",
      render: (item) => <p>{numberWithCommas(item.price * item.quantity)}</p>
    }
  ];

  useEffect(() => {
    try {
      const getInitData = async () => {
        const { data: product } = await productServices.getProductById(id);
        const { data: importBill } = await productServices.getLotCodeById(id);
        const { data: bill } = await productServices.getBillById(id);

        console.log(bill);

        setProduct(product.data);
        setProductLot(importBill.data);
        setExportBill(bill.export_history);
        setImportBill(bill.import_history);
      };

      getInitData();
    } catch (error) {
      toast.error("Không thể lấy thông tin, Vui lòng thử lại sau");
    }
  }, [id]);

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full bg-black opacity-5" />
      <div className="z-[999] w-full md:w-3/4 rounded-md border border-gray-200 border-2 bg-white text-left shadow-2xl">
        <div className="flex justify-between item-center p-5 border-b">
          <div>
            <span className="border-black border-r uppercase font-semibold pr-5">
              {product?.name}
            </span>
            <span
              className={clsx(
                "px-5 border-black border-r hover:cursor-pointer",
                activeTab === "infor" && "text-blue-500"
              )}
              onClick={() => setActiveTab("infor")}
            >
              Thông tin sản phẩm
            </span>
            <span
              className={clsx(
                "px-5 hover:cursor-pointer",
                activeTab === "bill" && "text-blue-500"
              )}
              onClick={() => setActiveTab("bill")}
            >
              Thông tin xuất, nhập kho
            </span>
          </div>
          <CloseIcon
            width={20}
            height={20}
            onClick={() => closeTab(false)}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="py-5 px-3 bg-[#f5f5f5] h-[700px] overflow-y-scroll">
          {activeTab === "infor" && (
            <div className="bg-white p-5">
              <div className="grid grid-cols-2 gap-10">
                <div className="col-span-1">
                  <p className="mb-5">Mã: {product?.sku}</p>
                  <p className="mb-5">Tên: {product?.name}</p>
                  <p className="mb-5">Danh mục: {product?.category_id}</p>
                  <p className="mb-5">Giá bán: {product?.price} VND</p>
                </div>

                <div className="col-span-1">
                  <p className="mb-5">Người tạo: admin</p>
                  <p className="mb-5">Ngày tạo: {product?.created_at}</p>
                </div>
              </div>

              <Table column={ProductLotColumn} dataSource={productLot} />
            </div>
          )}

          {activeTab === "bill" && (
            <div>
              <Select
                options={selectValue}
                handleClickChange={(value) => setOption(value)}
                option={option}
                containerClass="mb-10 bg-white"
              />

              {option.value === "import" ? (
                <Table column={importColumn} dataSource={importBill} />
              ) : (
                <Table column={exportColumn} dataSource={exportBill} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInforTab;
