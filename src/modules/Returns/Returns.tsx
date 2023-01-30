import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReturnsAPI } from "../../api/returns.api";
import { Button, Table } from "../../components";
import { EditIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { IRefund } from "../../types/refund.type";
import { ReturnsAction } from "../../types/returns.type";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const Returns = (props: Props) => {
  const [ returnsList, setReturnsList] = useState([]);

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
    console.log('ssdsd',type);
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
      title: "Tổng tiền hoàn trả",
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
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: 8,
      render: (id: number) => {
        return (
          <div className="flex items-center gap-5 justify-center">
            <Link
            to={`/returns/${id}`}
            className="hover:text-green-600 hover:underline font-medium"
            onClick={() => handleAddOrEditRefund(ReturnsAction.EDIT)}>Chi tiết</Link>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-3">
        <span className="text-3xl font-semibold mb-10 inline-block">
          Hàng hoàn trả
        </span>
        
        <Button
          className="h-16"
          onClick={() => handleAddOrEditRefund(ReturnsAction.ADD)}
        >
          Thêm nhân viên
        </Button>
      </div>
      <Table column={columns} dataSource={returnsList} />
    </div>
  );
};

export default Returns;
