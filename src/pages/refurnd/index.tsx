import React, { useEffect, useState } from "react";
import { getRefund } from "../../api/refund";
import { Button, Table } from "../../components";
import { EditIcon } from "../../components/icons";
import { ITableColumn } from "../../components/Table/Table.types";
import { IRefund } from "../../types/refund.type";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const RefundPage = (props: Props) => {
  const [refundList, setRefundList] = useState([]);

  const fetchDataRefundList = async () => {
    const { data, status } = await getRefund();
    if (status === 200) {
      setRefundList(data.data);
    }
  };

  useEffect(() => {
    fetchDataRefundList();
  }, []);

  console.log(refundList);

  const handleAddOrEditRefund = (type: IRefund) => {
    console.log(type);
  };

  const columns: ITableColumn[] = [
    {
      title: "Tên người tạo",
      dataIndex: "user_name",
      key: 1
    },
    {
      title: "Mã trả hàng",
      dataIndex: "refund_code",
      key: 7
    },
    {
      title: "Loại hoàn trả",
      dataIndex: "refund_type",
      key: 6,
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
      key: 2
    },
    {
      title: "Tổng số lượng hoàn",
      dataIndex: "refund_totall_quantity",
      key: 3
    },
    {
      title: "Ngày hoàn",
      dataIndex: "created_at",
      key: 8
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: 9,
      render: (record) => {
        return (
          <div className="flex items-center gap-5 justify-center">
            <EditIcon onClick={() => handleAddOrEditRefund(IRefund.EDIT)} />
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
          onClick={() => handleAddOrEditRefund(IRefund.ADD)}
        >
          Thêm nhân viên
        </Button>
      </div>
      <Table column={columns} dataSource={refundList} />
    </div>
  );
};

export default RefundPage;
