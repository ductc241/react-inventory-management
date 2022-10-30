import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Table, TextField } from "../../../components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hook/hook";
import {
  getDataSupplierProductApi,
  getOneShipment,
  getSuppliersApi
} from "../../../api/shipments";
import { ITableColumn } from "../../../components/Table/Table.types";

type Inputs = {
  impost_price: number;
  quantity: number;
};

const ShipMentsForm = () => {
  const [valueSelect, setValueSelect] = useState("");
  const [addShipment, setAddShipments] = useState<any>([]);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [products, setProducts] = useState<any>([]);
  const [total, setTotal] = useState([]);
  const { id } = useParams();
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, reset, register } = useForm<Inputs>();

  useEffect(() => {
    const getSuppliers = async () => {
      const { data } = await getSuppliersApi();
      setSuppliersOptions(data);
    };
    getSuppliers();
  }, []);

  if (id) {
    useEffect(() => {
      const getOneShipments = async () => {
        const { data } = await getOneShipment(id);
        reset(data);
      };
      getOneShipments();
    }, [id, reset]);
  }

  useEffect(() => {
    const getDataShipmentProduct = async () => {
      const res = await getDataSupplierProductApi(+valueSelect);
      setDataSource(res.data.products);
      // reset(data.products);
    };
    getDataShipmentProduct();
  }, [reset, valueSelect]);
  console.log(addShipment);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  const hanldeAddShipment = (record: object) => {
    setAddShipments([...addShipment, record]);
  };
  const columns: ITableColumn[] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: 2
    },
    {
      title: "",
      dataIndex: "action",
      key: 5,
      render: (record) => (
        <Button onClick={() => hanldeAddShipment(record)}>Add</Button>
      )
    }
  ];

  const columns2: ITableColumn[] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: 1
    },
    {
      title: "Số tiền nhập",
      dataIndex: "impost_price",
      key: 2,
      render: (record) => (
        <TextField
          name=""
          onChange={(e) => console.log(e.target.value)}
          type="number"
        />
      )
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: 3,
      render: (record) => <TextField name="" type="number" />
    }
  ];

  return (
    <form className="w-6/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <p className="mb-5 text-xl font-semibold">Phiếu nhập hàng</p>
      </div>
      <div className="flex gap-5 mb-5">
        <div className="w-6/12">
          <select
            className="border-[2px] w-full col-span-6 p-2.5 rounded-md mb-5"
            onChange={(e) => setValueSelect(e.target.value)}
          >
            <option defaultValue="">Chọn nhà cung cấp</option>
            {suppliersOptions?.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-6/12">
          <Table dataSource={dataSource} column={columns} />
        </div>
      </div>
      <div className="mb-5">
        <Table dataSource={addShipment} column={columns2} />
      </div>
      <span className="flex justify-end mb-5 text-lg">
        Tổng số tiền nhập hàng:
        <span className="ml-2 font-bold">1.000.000.000 VND</span>
      </span>

      <div className="flex gap-5">
        <Button type="submit">Xác nhận</Button>
        <Button variant="warning" onClick={() => navigate(-1)}>
          Bỏ qua
        </Button>
      </div>
    </form>
  );
};

export default ShipMentsForm;
