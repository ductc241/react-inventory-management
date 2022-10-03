import "./ProductForm.style.css";
import React, { useState } from "react";

import {
  Col,
  Row,
  Form,
  Button,
  Input,
  Typography,
  message,
  Upload,
  Image
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const { Title } = Typography;
const ProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl1, setImageUrl1] = useState<string>();
  const [imageUrl2, setImageUrl2] = useState<string>();
  const [imageUrl3, setImageUrl3] = useState<string>();
  const [imageUrl4, setImageUrl4] = useState<string>();
  const [imageUrl5, setImageUrl5] = useState<string>();
  const [properties, setProperties] = useState<boolean>(false);
  const [unit, setUnit] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: RcFile) => {
    console.log(file, "dsdsg");
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange1: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl1(url);
      });
    }
  };
  const handleChange2: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl2(url);
      });
    }
  };
  const handleChange3: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl3(url);
      });
    }
  };
  const handleChange4: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl4(url);
      });
    }
  };
  const handleChange5: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl5(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2}>Thêm hàng</Title>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={14}>
          <Form.Item
            label="Mã hàng"
            name="Pul"
            rules={[{ required: true, message: "Please input your Pul!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Giá vốn"
            name="costPrice"
            rules={[
              { required: true, message: "Please input your costPrice!" }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label="Mã vạch"
            name="Barcode"
            rules={[{ required: true, message: "Please input your Barcode!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Giá bán"
            name="Price"
            rules={[{ required: true, message: "Please input your Price!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label="Tên hàng"
            name="ProductName"
            rules={[
              { required: true, message: "Please input your ProductName!" }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Tồn kho"
            name="Inventory"
            rules={[
              { required: true, message: "Please input your Inventory!" }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            label="Nhóm hàng"
            name="GroupGoods"
            rules={[
              { required: true, message: "Please input your GroupGoods!" }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Trọng lượng"
            name="Weight"
            rules={[{ required: true, message: "Please input your Weight!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            label="Thương hiệu"
            name="Trademark"
            rules={[
              { required: true, message: "Please input your Trademark!" }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            label="Vị trí"
            name="Location"
            rules={[{ required: true, message: "Please input your Location!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={4} offset={2}>
              <Upload
                name="avatar1"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange1}
              >
                {imageUrl1 ? (
                  <img src={imageUrl1} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={4}>
              <Upload
                name="avatar2"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange2}
              >
                {imageUrl2 ? (
                  <img src={imageUrl2} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={4}>
              <Upload
                name="avatar3"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange3}
              >
                {imageUrl3 ? (
                  <img src={imageUrl3} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={4}>
              <Upload
                name="avatar4"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange4}
              >
                {imageUrl4 ? (
                  <img src={imageUrl4} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={4}>
              <Upload
                name="avatar5"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange5}
              >
                {imageUrl5 ? (
                  <img src={imageUrl5} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: "20px",
            borderRadius: "10px"
          }}>
          <div style ={{borderWidth:1,borderColor:"white"}}>
          <Button
            style={{
              backgroundColor: "#e4e4e4",
              width: "100%",
              display: "flex",
              color: "black",
              justifyContent: "space-between",
              borderRadius: "10px",
              alignItems: "center"
            }}
            onClick={() => setProperties(!properties)}
          >
            Thuộc tính
            <Image
              width={20}
              height={20}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9jg_QdwISNBxfOfsC-Ap80vKhK5w0w8gRJW5V2hGizg&s"
              fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9jg_QdwISNBxfOfsC-Ap80vKhK5w0w8gRJW5V2hGizg&s"
            />
          </Button>
          {properties === true && (
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button
                style={{
                  backgroundColor: "white"
                }}
              >
                Thêm thuộc tính
              </Button>
            </div>
          )}
          </div>
        </Col>
        <Col span={24} style={{ marginTop: "20px" }}>
          <Button
            style={{
              backgroundColor: "#e4e4e4",
              width: "100%",
              display: "flex",
              color: "black",
              justifyContent: "space-between",
              borderRadius: "10px",
              alignItems: "center"
            }}
            onClick={() => setUnit(!unit)}
          >
            Đơn vị tính
            <Image
              width={20}
              height={20}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9jg_QdwISNBxfOfsC-Ap80vKhK5w0w8gRJW5V2hGizg&s"
              fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9jg_QdwISNBxfOfsC-Ap80vKhK5w0w8gRJW5V2hGizg&s"
            />
          </Button>
          {unit === true && (
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button
                style={{
                  backgroundColor: "white"
                }}
              >
                Thêm đơn vị
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 20 }}>
        <Col span={2} offset={6}>
          <Form.Item label=" ">
            <Button
              type="text"
              htmlType="submit"
              style={{ backgroundColor: "#0dac50" }}
            >
              Lưu
            </Button>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label=" ">
            <Button
              type="text"
              htmlType="submit"
              style={{ backgroundColor: "#0dac50" }}
            >
              Lưu và liên kết kênh bán hàng
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label=" ">
            <Button
              type="text"
              htmlType="submit"
              style={{ backgroundColor: "#0dac50" }}
            >
              Lưu và thêm mới
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label=" ">
            <Button
              type="text"
              htmlType="submit"
              style={{ backgroundColor: "#0dac50" }}
            >
              Lưu và sao chép
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item label="">
            <Button
              type="text"
              htmlType="submit"
              style={{ backgroundColor: "#898c8d" }}
            >
              Bỏ qua
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
