import { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import type { ColumnsType } from "antd/es/table";
import { BsChevronDown } from "react-icons/bs";
import "./ProductsList.style.css";
import styled from "styled-components";
import axios from "axios";

const { Option } = Select;

const ButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #4bac4d;
  border: none;
  &:hover {
    background-color: #5cb85c;
  }
`;

interface DataType {
  key: React.Key;
  name: string;
  _id: number | any;
}

const Product = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isloading, setIsLoading] = useState(false);

  const fetchRecords = (page: number) => {
    setIsLoading(true);
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((res) => {
        setDataSource(res.data.data);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRecords(1);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      key: "_id",
      title: "Mã hàng",
      dataIndex: "_id"
    },
    {
      key: "name",
      title: "Tên hàng",
      dataIndex: "name"
    }
  ];

  return (
    <div className="container">
      <div className="product__content">
        <div className="select__search">
          <Select
            showSearch
            style={{ width: 400 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare(
                  (optionB!.children as unknown as string).toLowerCase()
                )
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
          </Select>
        </div>
        <div className="button__container">
          <ButtonStyle type="primary" size="large" icon={<IoMdAdd />}>
            Thêm mới
          </ButtonStyle>
          <ButtonStyle type="primary" size="large" icon={<FaFileImport />}>
            Import
          </ButtonStyle>
          <ButtonStyle type="primary" size="large" icon={<FaFileExport />}>
            Xuất file
          </ButtonStyle>
          <ButtonStyle type="primary" size="large" icon={<MenuOutlined />}>
            <BsChevronDown />
          </ButtonStyle>
        </div>
      </div>
      <div className="table__container">
        <Table
          // rowKey={key}
          loading={isloading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            total: totalPages,
            onChange: (page) => {
              fetchRecords(page);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Product;
