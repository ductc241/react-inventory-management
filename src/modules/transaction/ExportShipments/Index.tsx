import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import productServices from "../../../api/product.api";
import { Button, Select, Table, TextField } from "../../../components";
import { ArrowDownIcon, EditIcon, TrashIcon } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";
import { IProduct } from "./../../../types/product.type";
type Data = {
  quantity: number;
  price: number;
  amount: number;
  name: string;
};
type Inputs = {
  warehouse: string;
  sectors: string;
  supplier: string;
  note: string;
  payment: string;
  date: Date;
  data: Data[];
};

const ExportShipments = () => {
  const [product, setProduct] = useState<any>();
  const [items, setItems] = useState<any>(null);
  const [data, setData] = useState<any>([]);

  const getProduct = async (e: string) => {
    try {
      setItems(null);
      const { data } = await productServices.getProducts();
      let getProduct: any = [];
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].name.includes(e) == true && e != "") {
          getProduct.push(data.data[i]);
        }
      }

      setProduct(getProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ITableColumn[] = [
    {
      key: 1,
      title: "ID",
      dataIndex: "",
      render: (item: IProduct) => <div className="flex gap-x-5">{item.id}</div>
    },
    {
      key: 2,
      title: "Sản phẩm",
      dataIndex: "",
      render: (item: IProduct) => (
        <>
          <TextField
            className="w-5/12"
            //@ts-ignore
            {...register("data.name", {
              required: "bạn chưa nhập form này"
            })}
            value={item.name}
          />
        </>
      )
    },
    {
      key: 3,
      title: "Tồn",
      dataIndex: "",
      render: (item: IProduct) => (
        <div className="flex gap-x-5">{item.quantity}</div>
      )
    },
    {
      key: 4,
      title: "Số lượng",
      dataIndex: "",
      render: (item: IProduct) => (
        <TextField
          type="number"
          className="w-5/12"
          //@ts-ignore
          {...register("data.quantity", {
            required: "bạn chưa nhập form này"
          })}
          // error={errors.data}
        />
      )
    },
    {
      key: 5,
      title: "Giá",
      dataIndex: "",
      render: (item: IProduct) => (
        <TextField
          type="number"
          className="w-5/12"
          //@ts-ignore
          {...register("data.price", {
            required: "bạn chưa nhập form này"
          })}
          // error={errors.data.price}
        />
      )
    },
    {
      key: 6,
      title: "Thành tiền",
      dataIndex: "",
      render: (item: IProduct) => (
        <TextField
          type="number"
          className="w-5/12"
          //@ts-ignore
          {...register("data.amount", {
            required: "bạn chưa nhập form này"
          })}
          // error={errors.amount}
        />
      )
    },
    {
      key: 7,
      title: "Thao tác",
      dataIndex: "",
      render: (item: IProduct) => (
        <div className="group inline-block">
          <ul className="outline-none focus:outline-none px-3 py-1 rounded-sm flex items-center min-w-32">
            <span className="pr-1 font-semibold flex-1">
              <Link className="flex items-center hover:text-gray-200" to="#">
                <span className="inline-flex justify-center items-center ml-4">
                  <ArrowDownIcon width={20} />
                </span>
              </Link>
            </span>
          </ul>
          <ul
            className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                        transition duration-150 ease-in-out origin-top text-black w-40 py-2 drop-shadow-xl -ml-28"
          >
            <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
              <Button>In</Button>
            </li>
            <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
              <Button>Xuất</Button>
            </li>
            <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
              <Button>...</Button>
            </li>
            <li className="rounded-sm px-3 py-1 text-center hover:text-sky-700">
              <Button>...</Button>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const setItem = (e: IProduct) => {
    setProduct([]);
    setItems(e);
  };

  const addPoduct = () => {
    // setData([...data, items]);
    if (data?.length > 0) {
      let array: any = [];
      for (let i = 0; i < data?.length; i++) {
        if (array.indexOf(data[i]) == -1) {
          array.push(data[i]);
        }
      }
      setData(array);
    } else {
      setData([items]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (item: any) => {
    console.log(item);
  };
  return (
    <form className="grid grid-cols-2 gap-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-1 shadow-md rounded-lg">
        <div className="border-b p-5">
          <p>Thông tin</p>
        </div>
        <div className="p-5">
          <TextField
            label="Kho hàng"
            {...register("warehouse", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.warehouse}
            className="mb-5"
          />
          <TextField
            label="Loại hàng trả"
            {...register("sectors", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.sectors}
            className="mb-5"
          />
          <TextField
            {...register("supplier", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.supplier}
            label="Nhà cung cấp"
            className="mb-5"
          />
          <div>
            <p className="mb-1">Ghi chú</p>
            <textarea
              className="w-full border-2 h-[80px] border-[#DEDEDE] rounded-lg outline-none"
              {...register("note", {
                required: "bạn chưa nhập form này"
              })}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 shadow-md rounded-lg h-max">
        <div className="border-b p-5">
          <p>Thanh toán</p>
        </div>
        <div className="p-5">
          <TextField
            label="kiểu thanh toán"
            className="mb-5"
            {...register("payment", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.payment}
          />
          <TextField
            label="Ngày hẹn thanh toán"
            type="date"
            {...register("date", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.date}
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="mb-3">
          <p>Sản phẩm</p>
        </div>
        {items != null ? (
          <>
            <TextField
              name=""
              type="text"
              onChange={(e: any) => {
                getProduct(e.target.value);
              }}
              value={items?.name}
              className="w-11/12"
            />
            <Button onClick={() => addPoduct()} className="mt-3">
              Tạo
            </Button>
          </>
        ) : (
          <TextField
            name=""
            type="text"
            onChange={(e: any) => {
              getProduct(e.target.value);
            }}
            defaultValue={items?.name}
          />
        )}
        {product?.length > 0 ? (
          <>
            <select
              multiple
              id="countries_multiple"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3 h-max"
            >
              {product?.map((item: IProduct) => {
                return (
                  <option onClick={() => setItem(item)}>{item.name}</option>
                );
              })}
            </select>
          </>
        ) : null}

        {data.length > 0 ? (
          <>
            <div className="mt-3">
              <Table dataSource={data} column={columns} />
            </div>

            <div>
              <Button type="submit" className="mt-3">
                Lưu
              </Button>
              <Button variant="warning" className="mt-3  ml-3">
                Hủy
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
};
export default ExportShipments;
