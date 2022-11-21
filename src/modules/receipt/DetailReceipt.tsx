import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { number } from "yup";
import { getOrder } from "../../api/order.api";
import { getRecei } from "../../api/receipt.api";
import { Button, Table } from "../../components";
import SidebarHienThi from "../../components/Sidebar/Sidevar_Children/SidebarHienThi";
import { ITableColumn } from "../../components/Table/Table.types";

const DetailReceipt = () => {
  const [datas, setDatas] = useState<any>([]);
  const [dataOrder, setDataorder] = useState<any>([]);
  const { id } = useParams();
  const getReceiptId = async () => {
    const { data } = await getRecei(Number(id));
    const { data: dataOrders } = await getOrder(data.codeBill);
    setDataorder(dataOrders);
    setDatas(data);
  };

  useEffect(() => {
    getReceiptId();
  }, []);

  const infile = () => {
    console.log("dsg");
  };

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "Mã hàng",
      dataIndex: "plu"
    },
    {
      key: 2,
      title: "Tên hàng",
      dataIndex: "product_name"
    },
    {
      key: 3,
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Đơn giá",
      dataIndex: "unit_price"
    },
    {
      key: 5,
      title: "Giảm giá",
      dataIndex: "Discount"
    },
    {
      key: 6,
      title: "Giá bán",
      dataIndex: "price"
    },
    {
      key: 7,
      title: "Thành tiền",
      dataIndex: "into_money"
    }
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2 border">
          <SidebarHienThi />
        </div>
        <div className="col-span-10">
          <h1 className="text-center">Thông tin</h1>
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-4">
              <div className="m-3 flex">
                <label>Mã hóa đơn :</label>
                <p className="font-bold ml-6">{datas.codeBill}</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Thời gian :</label>
                <input
                  className="hover:cursor-no-drop ml-6"
                  type="date"
                  value={datas.Time}
                  min={datas.Time}
                  max={datas.Time}
                />
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Khách hàng :</label>
                <p className="ml-6 text-blue-600">{datas.Client}</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Bảng giá :</label>
                <p className="ml-6 text-blue-600">Bảng giá chung</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Mã đặt hàng :</label>
                <p className="ml-6 text-blue-600"></p>
              </div>
            </div>
            <div className="col-span-4">
              <div className="m-3 flex">
                <label>Trạng thái:</label>
                <p className="ml-6">Hoàn thành</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Chi nhánh:</label>
                <p className="ml-6">Chi nhánh trung tâm</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Người bán:</label>
                <p className="ml-6">Nguyễn Lê Hùng Cường</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Người tạo:</label>
                <p className="ml-6">Nguyễn Lê Hùng Cường</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Kênh bán:</label>
                <p className="ml-6">Bán trực tiếp</p>
              </div>
            </div>
            <div className="col-span-4">
              <div className="m-3 flex">
                <label>Tổng số lượng:</label>
                <p className="ml-6">39</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Tổng tiền hàng:</label>
                <p className="ml-6">3,430,250,000</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Giảm giá hóa đơn:</label>
                <p className="ml-6">0</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Khách cần trả:</label>
                <p className="ml-6">3,430,250,000</p>
              </div>
              <hr />
              <div className="m-3 flex">
                <label>Khách đã trả: </label>
                <p className="ml-6">3,430,250,000</p>
              </div>
            </div>
          </div>
          <div className="mt-3 mb-3">
            <Table dataSource={dataOrder.product} column={columns} />
          </div>
          <div className="flex  justify-end">
            <Button variant="warning" className="m-3">
              In
            </Button>
            <Button variant="warning" className="m-3 bg-gray-500">
              Xuất
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailReceipt;
