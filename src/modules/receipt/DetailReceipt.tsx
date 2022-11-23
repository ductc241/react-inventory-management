import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { number } from "yup";
import { getOrder } from "../../api/order.api";
import { getRecei, listRecei } from "../../api/receipt.api";
import { Button, Table } from "../../components";
import SidebarHienThi from "../../components/Sidebar/Sidevar_Children/SidebarHienThi";
import { ITableColumn } from "../../components/Table/Table.types";

const DetailReceipt = () => {
  const [datas, setDatas] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const { id } = useParams();
  const getReceiptId = async () => {
    const { data } = await getRecei(Number(id));
    const { data: dataReceipt } = await listRecei();
    let dataa: any = [];
    for (let i = 0; i < dataReceipt.data.length; i++) {
      if (dataReceipt.data[i].id == Number(id)) {
        dataa.push(dataReceipt.data[i]);
      }
    }
    setDatas(dataa);
    setDataList(data.data);
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
      title: "id",
      dataIndex: "id"
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
      dataIndex: "price"
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
      dataIndex: "into_money",
      render: (item: any) => <p>{item.price * item.quantity}</p>
    }
  ];
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold ">Thông tin</h1>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Mã hóa đơn :</label>
            <p className="font-bold ml-6">{datas[0]?.export_code}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Thời gian :</label>
            <p>{datas[0]?.export_date}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Số điện thoại khách hàng :</label>
            <p className="ml-6 ">{datas[0]?.receve_phone}</p>
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
            <p className="ml-6">{datas[0]?.status}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Chi nhánh:</label>
            <p className="ml-6">Chi nhánh trung tâm</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Người bán:</label>
            <p className="ml-6">{datas[0]?.user_name}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Người tạo:</label>
            <p className="ml-6">{datas[0]?.user_name}</p>
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
            <p className="ml-6">{datas[0]?.quantity}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Tổng tiền hàng:</label>
            <p className="ml-6">{datas[0]?.totall_price} VNĐ</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Giảm giá hóa đơn:</label>
            <p className="ml-6">0</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Khách cần trả:</label>
            <p className="ml-6">{datas[0]?.totall_price} VNĐ</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Khách đã trả: </label>
            <p className="ml-6">....</p>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <Table dataSource={dataList} column={columns} />
      </div>
      <div className="flex  justify-end">
        <Button variant="container" className="m-3" onClick={() => infile()}>
          In
        </Button>
        <Button variant="warning" className="m-3 " onClick={() => infile()}>
          Xuất
        </Button>
        <Button variant="container" onClick={() => infile()} className="m-3">
          <Link to="/receipt"> Quay lại</Link>
        </Button>
      </div>
    </div>
  );
};

export default DetailReceipt;
