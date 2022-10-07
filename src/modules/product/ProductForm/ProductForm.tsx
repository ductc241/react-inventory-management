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
  Image,
  Collapse,
  Space,
  Select,
  Modal
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DownOutlined,
  UpOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const { Title } = Typography;
const { Panel } = Collapse;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"]
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
};
const ProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl1, setImageUrl1] = useState<string>();
  const [imageUrl2, setImageUrl2] = useState<string>();
  const [imageUrl3, setImageUrl3] = useState<string>();
  const [imageUrl4, setImageUrl4] = useState<string>();
  const [imageUrl5, setImageUrl5] = useState<string>();
  const [properties, setProperties] = useState<boolean>(false);
  const [unit, setUnit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenGD, setIsModalOpenGD] = useState(false);
  const [form] = Form.useForm();
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

  const onChange = () => {
    setProperties(!properties);
  };

  const onChange1 = () => {
    setUnit(!unit);
  };

  const genExtra = () =>
    properties === false ? (
      <DownOutlined
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      />
    ) : (
      <UpOutlined
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      />
    );

  const genExtras = () =>
    unit === false ? (
      <DownOutlined
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      />
    ) : (
      <UpOutlined
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      />
    );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{
          span: 6
        }}
        wrapperCol={{
          span: 17
        }}
      >
        <Title level={2}>Thêm hàng</Title>
        <Row>
          <Col md={{ span: 13 }}>
            <Form.Item
              label="Mã hàng"
              name="Pul"
              rules={[{ required: true, message: "Please input your Pul!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={{ span: 9 }}>
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
          <Col md={{ span: 13 }}>
            <Form.Item
              label="Mã vạch"
              name="Barcode"
              rules={[
                { required: true, message: "Please input your Barcode!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={{ span: 9 }}>
            <Form.Item
              label="Giá bán"
              name="Price"
              rules={[{ required: true, message: "Please input your Price!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col md={{ span: 13 }}>
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
          <Col md={{ span: 9 }}>
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

          <Col md={{ span: 13 }}>
            <Form.Item
              label="Nhóm hàng"
              name="GroupGoods"
              rules={[
                { required: true, message: "Please input your GroupGoods!" }
              ]}
            >
              <Row>
                <Col md={{ span: 23 }}>
                  <Input />
                </Col>

                <Col md={{ span: 1 }}>
                  <Button onClick={() => showModal()} icon={<PlusOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col md={{ span: 9 }}>
            <Form.Item
              label="Trọng lượng"
              name="Weight"
              rules={[{ required: true, message: "Please input your Weight!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col md={{ span: 13 }}>
            <Form.Item
              label="Thương hiệu"
              name="Trademark"
              rules={[
                { required: true, message: "Please input your Trademark!" }
              ]}
            >
              <Row>
                <Col md={{ span: 23 }}>
                  <Input />
                </Col>

                <Col md={{ span: 1 }}>
                  <Button
                    onClick={() => setIsModalOpenGD(true)}
                    icon={<PlusOutlined />}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={{ span: 13 }}>
            <Form.Item
              label="Vị trí"
              name="Location"
              rules={[
                { required: true, message: "Please input your Location!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={{ span: 13 }}>
            <Row>
              <Col span={4}>
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
                    <img
                      src={imageUrl1}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={4} offset={1}>
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
                    <img
                      src={imageUrl2}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={4} offset={1}>
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
                    <img
                      src={imageUrl3}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={4} offset={1}>
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
                    <img
                      src={imageUrl4}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={4} offset={1}>
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
                    <img
                      src={imageUrl5}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
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
            }}
          >
            <Collapse onChange={onChange} expandIcon={() => null}>
              <Panel
                header="thuộc tính"
                key="1"
                extra={genExtra()}
                style={{ backgroundColor: "#ececee" }}
              >
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "first"]}
                            rules={[
                              { required: true, message: "Bạn chưa nhập" }
                            ]}
                          >
                            <Input placeholder="" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "last"]}
                            rules={[
                              { required: true, message: "bạn chưa nhập" }
                            ]}
                          >
                            <Input placeholder="" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm thuộc tính
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Panel>
            </Collapse>
          </Col>
          <Col span={24} style={{ marginTop: "20px" }}>
            <Collapse onChange={onChange1} expandIcon={() => null}>
              <Panel
                header="đơn vị tính"
                key="1"
                extra={genExtras()}
                style={{ backgroundColor: "#ececee" }}
              >
                <Form.List name="unit">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "first"]}
                            rules={[
                              { required: true, message: "Bạn chưa nhập" }
                            ]}
                          >
                            <Input placeholder="Đơn vị cơ bản" />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm đơn vị
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
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
      <Modal
        title="Thêm nhóm hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic">
          <Form.Item label="tên nhóm">
            <Input />
          </Form.Item>
          <Form.Item label="nhóm cha">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm thương hiệu"
        open={isModalOpenGD}
        onOk={() => setIsModalOpenGD(false)}
        onCancel={() => setIsModalOpenGD(false)}
      >
        <Form name="basic">
          <Form.Item label="tên thương hiệu">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default ProductForm;
