import React, { useEffect, useState } from "react";
import { getAllUserApi } from "../../api/user.api";
import { Table } from "../../components";
import { ITableColumn } from "../../components/Table/Table.types";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const User = (props: Props) => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    const getAllUser = async () => {
      const res = await getAllUserApi();
      if (res.status === 200) {
        setListUser(res.data.data);
      }
    };
    getAllUser();
  }, []);

  const column: ITableColumn[] = [
    {
      key: 1,
      title: "Tên người dùng",
      dataIndex: "name"
    },
    {
      key: 2,
      title: "Email",
      dataIndex: "email"
    },
    {
      key: 3,
      title: "Số điện thoại",
      dataIndex: "phone_number"
    },
    {
      key: 4,
      title: "Kích hoạt tài khoản",
      dataIndex: "status",
      render: (record) => {
        return (
          <div>{record.status === 1 ? "Đã kích hoạt" : "chưa kích hoạt"}</div>
        );
      }
    }
  ];
  return (
    <div>
      <span className="text-3xl font-semibold mb-10 inline-block">
        Nhân viên
      </span>
      <Table column={column} dataSource={listUser ? listUser : []} linkUrl />
    </div>
  );
};

export default User;
