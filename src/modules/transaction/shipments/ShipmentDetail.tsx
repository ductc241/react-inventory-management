import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneShipment, listShipments } from "../../../api/shipments";
import { Button, Table } from "../../../components";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { ITableColumn } from "../../../components/Table/Table.types";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const ShipmentDetail = (props: Props) => {
  const [datas, setDatas] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { id } = useParams();
  const getReceiptId = async () => {
    const { data } = await getOneShipment(Number(id));
    const { data: dataReceipt } = await listShipments();
    const dataa: any = [];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const reportTemplateRef = useRef<any>(null);
  const infile = () => {
    const doc = new jsPDF({
      format: "a2",
      unit: "px"
    });
    // Adding the fonts.
    // doc.setFont("Courier", "normal");
    console.log("dsfsg");
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        doc.save("export_shipments");
      }
    });
  };

  console.log(dataList);

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "id",
      dataIndex: `product_id`
    },
    {
      key: 2,
      title: "Ten Hang",
      dataIndex: "product_name"
    },
    {
      key: 3,
      title: "So Luong",
      dataIndex: "quantity"
    },
    {
      key: 6,
      title: "Gia ban",
      dataIndex: "import_price",
      render: (item: any) => (
        <p>
          <FormatNumber number={item?.import_price} />
        </p>
      )
    },
    {
      key: 7,
      title: "Thanh tien",
      dataIndex: "into_money",
      render: (item: any) => (
        <p>
          <FormatNumber number={item?.import_price * item?.quantity} />
        </p>
      )
    }
  ];

  const Prints = () => (
    <div className="p-5" ref={reportTemplateRef}>
      <div className="flex p-3">
        <span className="w-2/12">{datas[0]?.import_date}</span>
        <h1 className="text-center w-10/12 -ml-8  text-xl font-bold">
          Giao Dich Hoa Don
        </h1>
      </div>

      <div className="ml-[20%]">
        <p className="text-base">Cua hang:....</p>
        <p className="text-base">Dia chi: </p>
        <p className="text-base">So dien thoai : {datas[0]?.receve_phone} </p>
      </div>
      <h1 className="text-center text-xl font-bold mt-3">Hoa don xuat hang</h1>
      <p className="text-center text-base mt-3">
        Hoa don xuat hang: {datas[0]?.export_code}
      </p>
      <p className="text-center text-base mt-3">{datas[0]?.import_date}</p>

      <div className="mt-3 mb-3">
        <Table dataSource={dataList} column={columns} />
      </div>
      <div className=" mt-5 ml-3 mr-3">
        <div className="flex justify-between">
          <p className="text-base">Tong cong:</p>
          <p className="text-base">{datas[0]?.quantity}</p>
          <p className="text-base">
            {datas[0]?.totall_price.toLocaleString("en")}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">chiet khau hoa don:</p>
          <p className="text-base"></p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Tong thanh toan:</p>

          <p className="text-base">
            {datas[0]?.totall_price.toLocaleString("en")}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Khach hang thanh toan:</p>
          <p className="text-base">
            {datas[0]?.status != 1
              ? datas[0]?.totall_price.toLocaleString("en")
              : ""}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">con lai:</p>

          <p className="text-base">
            {(datas[0]?.totall_price - datas[0]?.totall_price).toLocaleString(
              "en"
            )}
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="ml-6">
            <p className="text-base">Nguoi mua hang</p>
            <p className="text-base text-center"></p>
          </div>
          <div className="ml-6">
            <p className="text-base">
              Ngay {datas[0]?.created_at.split("/")[0]} Thang{" "}
              {datas[0]?.created_at.split("/")[1]} Nam{" "}
              {datas[0]?.created_at.split("/")[2]}
            </p>
            <p className="text-base text-center">Nguoi ban hang</p>
            <p className="text-base text-center"></p>
          </div>
        </div>
      </div>
    </div>
  );
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
            <label>Thời gian: &nbsp; </label>
            <p>{datas[0]?.import_date}</p>
          </div>
          <hr />
        </div>
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Trạng thái:</label>
            <p className="ml-6 text-red-600">
              {datas[0]?.status == 1 ? "Chưa thanh toán" : "Đã thanh toán"}
            </p>
          </div>
          <hr />

          <div className="m-3 flex">
            <label>Người bán:</label>
            <p className="ml-6">{datas[0]?.user_name} Admin</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Người tạo:</label>
            <p className="ml-6">{datas[0]?.user_name} Admin</p>
          </div>
          <hr />
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
            <p className="ml-6 text-blue-600">
              {datas[0]?.status == 1
                ? "0 VNĐ"
                : `${datas[0]?.totall_price.toLocaleString("en")} VNĐ`}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <Table dataSource={dataList ? dataList : datas} column={columns} />
      </div>

      <div className="flex  justify-end">
        <Button
          variant="container"
          className="m-3"
          onClick={() => setVisible(true)}
        >
          In
        </Button>
        <Button variant="container" className="m-3">
          <Link to="/import_shipments"> Quay lại</Link>
        </Button>
      </div>
      {visible && (
        <>
          <div className="fixed inset-0 flex justify-center items-center ">
            <div className="fixed inset-0 bg-black opacity-10" />
            <div className="z-[999] min-w-[600px] p-[30px] rounded-[20px] bg-white text-left shadow-modal">
              {Prints()}
              <div className="flex  justify-end mt-4">
                <Button
                  variant="container"
                  className="m-3"
                  onClick={() => infile()}
                >
                  In
                </Button>
                <Button
                  variant="warning"
                  className="m-3 "
                  onClick={() => infile()}
                >
                  Xuất
                </Button>
                <Button
                  variant="container"
                  className="m-3"
                  onClick={() => setVisible(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShipmentDetail;
