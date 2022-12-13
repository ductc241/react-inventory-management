import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneShipment, listShipments } from "../../../api/shipments";
import { Button, Table } from "../../../components";
import FormatNumber from "../../../components/formatNumber/formatNumber";
import { ITableColumn } from "../../../components/Table/Table.types";
import QR from "../../../components/QR";

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
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        doc.save("import_shipments");
      }
    });
  };

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
    <div className="p-5 border-double border-4 border-green-600 bg-auto bg-no-repeat bg-center imgBG" ref={reportTemplateRef}>
      <div className="flex space-x-8 mt-4">
        <div className="mt-2">
          <img src="https://res.cloudinary.com/dywsyrah3/image/upload/v1669193368/poly_wareh_j06pfe_y53k83.png" alt="" width="80px" />
        </div>
        <div className="">
          <h2 className="text-lg font-bold">Poly Wareh</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <p>Địa chỉ: Nam Từ Liêm, Hà Nội</p>
              <p>Điện thoại: 0912345678</p>
            </div>
            <div className="">
              <p>Email: admin@gamil.com</p>
              <p>Tài khoản: MB Bank - 0923239468</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-slate-400">_______________________________________________________________________________________</p>
      <div className="grid grid-cols-3 gap-3 text-center mt-4">
        <div className="logo">
          <QR />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold">Hoá đơn bán hàng</h2>
          <p className="italic">(VAT INVOICE)</p>
          {/* <p>Ngày(Date)...., tháng(month)...., năm(year)......</p> */}
          <p>{datas[0]?.import_date}</p>
        </div>
        <div className="">
          <p>Mẫu số: <b>0000001</b></p>
          <p>Số: <b>0000001</b></p> {/* id mẫu tăng dần, k lặp, k bao giờ thay đổi */}
        </div>
      </div>
      <p className="text-center text-slate-400">_______________________________________________________________________________________</p>
      <div className="space-y-2 mt-2">
        <p className="text-base">Họ tên KH:......</p>
        <p className="text-base">Tên đơn vị:......</p>
        <p className="text-base">Điện thoại:{datas[0]?.receve_phone}</p>
        <p className="text-base">Địa chỉ:......</p>
        <p className="text-base">Số tài khoản:......</p>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-base">Hình thức thanh toán:......</p>
          <p className="text-base ml-32">Đơn vị tiền:......</p>
        </div>
      </div>
      <div className="mt-6 mb-3">
        <Table dataSource={dataList} column={columns} />
      </div>
      <div className=" mt-5 ml-3 mr-3">
        <div className="flex justify-between">
          <p className="text-base">Tổng cộng:</p>
          <p className="text-base">{datas[0]?.quantity}</p>
          <p className="text-base">{datas[0]?.totall_price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Chiết khấu hoá đơn:</p>
          <p className="text-base"></p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Tổng thanh toán:</p>

          <p className="text-base">{datas[0]?.totall_price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Khách hàng thanh toán:</p>
          <p className="text-base">
            {datas[0]?.status != 1 ? datas[0]?.totall_price : ""}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Còn lại:</p>
          <p className="text-base">
            {(datas[0]?.totall_price - datas[0]?.totall_price).toLocaleString(
              "en"
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 justify-between mt-8">
          <div className="ml-6 text-left">
            <p className="text-base">NGƯỜI MUA</p>
            <p className="text-sm">(ký tên)</p>
          </div>
          <div className="ml-6 text-right">
            <p className="text-base">NGƯỜI BÁN</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-32">
        <p className="italic">(Cần kiểm tra, đối chiếu khi lập, giao, nhận hoá đơn)</p>
      </div>
    </div>
  );

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold ">Thông tin</h1>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Mã đơn hàng :</label>
            <p className="font-bold ml-6">{datas[0]?.import_code}</p>
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
            <p className="ml-6">
              {
                <FormatNumber
                  number={+dataList[0]?.import_price * +dataList[0]?.quantity}
                />
              }
            </p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Giảm giá hóa đơn:</label>
            <p className="ml-6">0 VND </p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Số tiền khác còn phải đóng:</label>
            <p className="ml-6">
              <FormatNumber
                number={
                  datas[0]?.status === 1
                    ? datas[0]?.import_price_totail
                    : datas[0]?.import_price_totail
                }
              />
            </p>
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
          Xuất PDF
        </Button>
        <Button variant="container" className="m-3">
          <Link to="/import_shipments">Quay lại</Link>
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
                  Xuất PDF
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
