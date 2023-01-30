import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getRecei, listRecei } from "../../api/receipt.api";
import { listReturnsAPI, getReturnsAPI } from "../../api/returns.api";
import { Button, Table } from "../../components";
import { ITableColumn } from "../../components/Table/Table.types";
import { ReturnsAction } from "../../types/returns.type";


const DetailReturns = () => {
  const [datas, setDatas] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { id } = useParams();
  const getReturnsId = async () => {
    const { data } = await getReturnsAPI(Number(id));
    const { data: dataReturns } = await listReturnsAPI();
    const dataa: any = [];
    for (let i = 0; i < dataReturns.data.length; i++) {
      if (dataReturns.data[i].id == Number(id)) {
        dataa.push(dataReturns.data[i]);
      }
    }
    setDatas(dataa);
    setDataList(data.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (Number(id)) {
      navigate("/*");
    } else {
      getReturnsId();
    }
  }, []);






  const [returns, setReturns] = useState([]);
  useEffect(() => {
    async function getReturns() {
      const { data } = await listReturnsAPI();
      setReturns(data);
    }
    getReturns();
  }, []);
  const [returnsList, setReturnsList] = useState([]);
  const fetchDataReturnsList = async () => {
    const { data, status } = await listReturnsAPI();
    if (status === 200) {
      setReturnsList(data.data);
    }
  };
  useEffect(() => {
    fetchDataReturnsList();
  }, []);
  console.log(returnsList);
  const handleAddOrEditRefund = (type: ReturnsAction) => {
    console.log(type);
  };

  const columns: ITableColumn[] = [
    {
      title: "Mã trả hàng",
      dataIndex: "refund_code",
      key: 1
    },
    {
      title: "Tên người tạo",
      dataIndex: "user_name",
      key: 2
    },
    {
      title: "Loại hoàn trả",
      dataIndex: "refund_type",
      key: 3,
      render: (record) => {
        return (
          <div>
            {record.status === 1
              ? "Khách hàng hoàn trả"
              : "Cửa hàng hoàn cho NCC"}
          </div>
        );
      }
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: 4
    },
    {
      title: "Tổng giá hoàn trả",
      dataIndex: "refund_price_totail",
      key: 5
    },
    {
      title: "Tổng số lượng hoàn",
      dataIndex: "refund_totall_quantity",
      key: 6
    },
    {
      title: "Ngày hoàn",
      dataIndex: "created_at",
      key: 7
    }
  ];

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-10">
        Chi tiết hàng hoàn trả
      </h1>
      <div className="grid grid-cols-12 gap-10 mb-8">
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Mã hóa đơn :</label>
            <p className="font-bold ml-6">{datas?.refund_code}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Thời gian hoàn :</label>
            <p>{datas[0]?.created_at}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Trạng thái:</label>
            <p className="ml-6 text-blue-600">
              {datas[0]?.status == 1 ? "Chưa thanh toán" : "Đã thanh toán"}
            </p>
          </div>
          <hr />
        </div>
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Người hoàn:</label>
            <p className="ml-6">{datas[0]?.user_name}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Tổng số lượng hoàn:</label>
            <p className="ml-6">{datas[0]?.refund_totall_quantity}</p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Loại hoàn trả:</label>
            <p className="ml-6 text-blue-600">
              {datas[0]?.status == 1
                ? "Hoàn trả lại nhà cung cấp"
                : "Khách hàng hoàn trả"}
            </p>
          </div>
          <hr />
        </div>
        <div className="col-span-4">
          <div className="m-3 flex">
            <label>Tổng tiền hoàn:</label>
            <p className="ml-6">
              {datas[0]?.refund_price_totail.toLocaleString("en")} VNĐ
            </p>
          </div>
          <hr />
          <div className="m-3 flex">
            <label>Mô tả:</label>
            <p className="ml-6">{datas[0]?.description}</p>
          </div>
          <hr />
        </div>
      </div>

      <div className="mt-3 mb-3">
        <Table dataSource={returnsList} column={columns} />
      </div>
      <div className="flex  justify-end">
        <Link to="/returns">
          <Button variant="container" className="m-3">
            Quay lại
          </Button>
        </Link>
        <Button
          variant="container"
          className="m-3"
          // onClick={() => setVisible(true)}
        >
          Nhận lại hàng
        </Button>
      </div>
    </div>
  );
};

export default DetailReturns;
