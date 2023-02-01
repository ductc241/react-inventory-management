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

interface IImportBill {
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
  const [importBill, setImportBill] = useState<IImportBill[]>([]);
  const [exportBill, setExportBill] = useState([]);

  const ImportColumn: ITableColumn[] = [
    {
      key: 1,
      title: "Mã lô",
      dataIndex: "lot_code"
    },
    {
      key: 2,
      title: "Ngày",
      dataIndex: "lot_code",
      render: (record: IImportBill) => <p>{record.lot_code.slice(3)}</p>
    },
    {
      key: 3,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Tổng vốn",
      dataIndex: "import_price",
      render: (record: IImportBill) => (
        <p>{numberWithCommas(record.quantity * record.import_price)}</p>
      )
    }
  ];

  useEffect(() => {
    try {
      const getInitData = async () => {
        const { data: product } = await productServices.getProductById(id);
        const { data: importBill } = await productServices.getLotCodeById(id);

        setProduct(product.data);
        setImportBill(importBill.data);
      };

      getInitData();
    } catch (error) {
      toast.error("Không thể lấy thông tin, Vui lòng thử lại sau");
    }
  }, [id]);

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full bg-black opacity-5" />
      <div className="z-[999] w-full md:w-3/4 rounded-md bg-white text-left drop-shadow-2xl">
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
            <div className="w-3/4 bg-white p-5">
              <div className="grid grid-cols-2 gap-10">
                <div className="col-span-1">
                  <p className="mb-5">Mã: {product?.sku}</p>
                  <p className="mb-5">Tên: {product?.name}</p>
                  <p className="mb-5">Danh mục: {product?.category_id}</p>
                  <p className="mb-5">Người tạo: admin</p>
                  <p className="mb-5">Ngày tạo: {product?.created_at}</p>
                </div>

                <div className="col-span-1">
                  <p className="mb-5">Giá nhập: {product?.price}</p>
                  <p className="mb-5">Giá bán:{product?.price}</p>
                  <p className="mb-5">Giá vốn: {product?.price}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bill" && (
            <div>
              <Select
                options={selectValue}
                handleClickChange={(value) => console.log(value)}
                option={option}
                containerClass="mb-10"
              />

              <Table column={ImportColumn} dataSource={importBill} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInforTab;
