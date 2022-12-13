import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { number } from "yup";
import { getOrder } from "../../api/order.api";
import { getRecei, listRecei } from "../../api/receipt.api";
import { Button, Modal, Table } from "../../components";
import { ITableColumn } from "../../components/Table/Table.types";

const DetailReceipt = () => {
  const [datas, setDatas] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { id } = useParams();
  const getReceiptId = async () => {
    const { data } = await getRecei(Number(id));
    const { data: dataReceipt } = await listRecei();
    const dataa: any = [];
    for (let i = 0; i < dataReceipt.data.length; i++) {
      if (dataReceipt.data[i].id == Number(id)) {
        dataa.push(dataReceipt.data[i]);
      }
    }
    setDatas(dataa);
    setDataList(data.data);
  };

  console.log(dataList, "dataList");

  useEffect(() => {
    getReceiptId();
  }, []);

  const reportTemplateRef = useRef<any>(null);
  const handleConfirm = () => {
    const isConfirm = confirm("bạn muốn in ra file pdf ");
    isConfirm ? handleInfile() : null;
  };
  const handleInfile = useReactToPrint({
    content: () => reportTemplateRef.current,
    documentTitle: "export_shipments"
  });

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "id",
      dataIndex: "id"
    },
    {
      key: 2,
      title: "Tên Hàng",
      dataIndex: "product_name"
    },
    {
      key: 3,
      title: "Số Lượng",
      dataIndex: "quantity"
    },
    {
      key: 4,
      title: "Mã lô hàng",
      dataIndex: "lot_code"
    },
    {
      key: 5,
      title: "Đơn giá",
      dataIndex: "price",
      render: (item: any) => <p>{item?.price?.toLocaleString("en")}</p>
    },
    {
      key: 6,
      title: "Giảm giá",
      dataIndex: "Discount"
    },
    {
      key: 7,
      title: "Giá bán",
      dataIndex: "price",
      render: (item: any) => <p>{item?.price.toLocaleString("en")}</p>
    },
    {
      key: 8,
      title: "Thành tiền",
      dataIndex: "into_money",
      render: (item: any) => (
        <p>{(item?.price * item?.quantity).toLocaleString("en")}</p>
      )
    }
  ];

  const Prints = () => (
    <div className="p-5" ref={reportTemplateRef}>
      <div className="flex p-3">
        <span className="w-2/12">{datas[0]?.export_date}</span>
        <h1 className="text-center w-10/12 -ml-8  text-xl font-bold">
          Giao Dịch Hóa Đơn
        </h1>
      </div>

      <div className="ml-[20%]">
        <p className="text-base">Cửa hàng:....</p>
        <p className="text-base">Địa chỉ: </p>
        <p className="text-base">Số điện thoại : {datas[0]?.receve_phone} </p>
      </div>
      <h1 className="text-center text-xl font-bold mt-3">Hóa đơn xuất hàng:</h1>
      <p className="text-center text-base mt-3">{datas[0]?.export_code}</p>
      <p className="text-center text-base mt-3">{datas[0]?.export_date}</p>

      <div className="mt-3 mb-3">
        <Table dataSource={dataList} column={columns} />
      </div>
      <div className=" mt-5 ml-3 mr-3">
        <div className="flex justify-between">
          <p className="text-base">Tổng cộng:</p>
          <p className="text-base">{datas[0]?.quantity}</p>
          <p className="text-base">
            {datas[0]?.totall_price.toLocaleString("en")}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">chiết khấu hóa đơn:</p>
          <p className="text-base"></p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Tổng thanh toán:</p>

          <p className="text-base">
            {datas[0]?.totall_price.toLocaleString("en")}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-base">Khách hàng thanh toán:</p>
          <p className="text-base">
            {datas[0]?.status != 1
              ? datas[0]?.totall_price.toLocaleString("en")
              : ""}
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
        <div className="flex justify-between mt-8">
          <div className="ml-6">
            <p className="text-base">Người mua hàng</p>
            <p className="text-base text-center"></p>
          </div>
          <div className="ml-6">
            <p className="text-base">
              Ngày {datas[0]?.created_at.split("/")[0]} Tháng{" "}
              {datas[0]?.created_at.split("/")[1]} Năm{" "}
              {datas[0]?.created_at.split("/")[2]}
            </p>
            <p className="text-base text-center">Người bán hàng</p>
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
            <label>Thời gian :</label>
            <p>{datas[0]?.export_date}</p>
          </div>
          <hr />
        </div>
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Trạng thái:</label>
            <p className="ml-6 text-blue-600">
              {datas[0]?.status == 1 ? "Chưa thanh toán" : "Đã thanh toán"}
            </p>
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
              {datas[0]?.totall_price.toLocaleString("en")} VNĐ
            </p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Giảm giá hóa đơn:</label>
            <p className="ml-6">0</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Khách cần trả:</label>
            <p className="ml-6">
              {datas[0]?.totall_price.toLocaleString("en")} VNĐ
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
        <Table dataSource={dataList} column={columns} />
      </div>

      <div className="flex  justify-end">
        <Button
          variant="container"
          className="m-3"
          onClick={() => setVisible(true)}
        >
          In
        </Button>
        <Button
          variant="warning"
          className="m-3 "
          onClick={() => setVisible(true)}
        >
          Xuất
        </Button>
        <Button variant="container" className="m-3">
          <Link to="/receipt"> Quay lại</Link>
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
                  onClick={() => {
                    handleConfirm();
                  }}
                >
                  In
                </Button>
                <Button
                  variant="warning"
                  className="m-3 "
                  onClick={() => {
                    handleConfirm();
                  }}
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

export default DetailReceipt;
