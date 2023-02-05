import { da } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getRecei, listRecei } from "../../api/receipt.api";
import { Button, Table } from "../../components";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number(id)) {
      navigate("/*");
    } else {
      getReceiptId();
    }
  }, []);

  const reportTemplateRef = useRef<any>(null);

  const handleConfirm = useReactToPrint({
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
    <div ref={reportTemplateRef} className="p-5">
      <div className="flex justify-between">
        <div className="font-bold	text-base">
          <p>Đơn vị : ...........</p>
          <p>Bộ phận : ..........</p>
        </div>
        <div>
          <p className="text-center font-bold	text-base">Mẫu số 02 - VT </p>
          <p className="text-sm font-medium	">
            (Ban hành theo Thông tư số 133/2016/TT-BTC{" "}
          </p>
          <p className="text-center text-sm font-medium	">
            Ngày 26/08/2016 của Bộ Tài chính )
          </p>
        </div>
      </div>
      <div className="mt-5 w-full">
        <h1
          className="w-2/5 text-center font-bold	text-lg	"
          style={{ marginLeft: "30%" }}
        >
          PHIẾU XUẤT KHO
        </h1>
      </div>
      <div className="w-full text-sm font-medium	">
        <div className="w-full">
          <div className="flex ">
            <p style={{ marginLeft: "35%", width: "30%" }}>
              Ngày {datas[0]?.created_at.split("/")[0]} tháng{" "}
              {datas[0]?.created_at.split("/")[1]} năm{" "}
              {datas[0]?.created_at.split("/")[2]}
            </p>
            <span className="ml-10">Có : ....................</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex">
            <p style={{ marginLeft: "35%", width: "30%" }}>
              Số : ...........................
            </p>
            <span className="ml-10">Có : ....................</span>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium">
        <p>
          - Họ và tên người nhận hàng:................ Địa chỉ(Bộ
          phận)..........................
        </p>
        <p>
          - Lý do xuất kho :
          ..........................................................................................
        </p>
        <p>
          - Xuất tại kho (ngăn lô) :
          ...............................................................................
        </p>
      </div>
      <table className="w-full border-collapse border mt-5">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border" rowSpan={2}>
              STT
            </th>
            <th className="border w-1/4 pl-3 pr-2" rowSpan={2}>
              Tên, nhãn hiệu,quy cách, phẩm chất vật tư, dụng cụ, sản phẩm, hàng
              hóa
            </th>
            <th className="border py-3" rowSpan={2}>
              Mã số
            </th>
            <th className="border py-3" colSpan={2}>
              Số lượng
            </th>
            <th className="border py-3" rowSpan={2}>
              Đơn giá
            </th>
            <th className="border py-3" rowSpan={2}>
              Thành tiền
            </th>
          </tr>
          <tr>
            <th className="border py-3">Yêu cầu</th>
            <th className="border py-3">Thực xuất</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {dataList.length > 0 &&
            dataList.map((data: any, index: number) => {
              console.log(data.id, "id");

              return (
                <tr key={data.id}>
                  <td className="border py-3 text-center">{index + 1}</td>
                  <td className="border py-3 text-center">
                    {data.product_name}
                  </td>
                  <td className="border py-3 text-center">{data.barcode}</td>
                  <td className="border py-3 text-center">{data.quantity}</td>
                  <td className="border py-3 text-center">{data.quantity}</td>
                  <td className="border py-3 text-center">
                    {data.price.toLocaleString("en")} VNĐ
                  </td>
                  <td className="border py-3 text-center">
                    {(data.price * data.quantity).toLocaleString("en")} VNĐ
                  </td>
                </tr>
              );
            })}
          <tr>
            <td className="border py-3 text-center"></td>
            <td className="border py-3 text-center">Cộng</td>
            <td className="border py-3 text-center">X</td>
            <td className="border py-3 text-center">X</td>
            <td className="border py-3 text-center">X</td>
            <td className="border py-3 text-center">X</td>
            <td className="border py-3 text-center"></td>
          </tr>
        </tbody>
      </table>
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
