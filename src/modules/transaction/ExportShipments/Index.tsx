import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import productServices from "../../../api/product.api";
import { addRecei } from "../../../api/receipt.api";
import { list } from "../../../api/supplier.api";
import { Button, Select, Table, TextField } from "../../../components";
import { ArrowDownIcon, EditIcon, TrashIcon } from "../../../components/icons";
import { ITableColumn } from "../../../components/Table/Table.types";
import index from "../../../pages/priceSetting";
import IOption from "../../../types/option.model";
import { ISupplier } from "../../../types/supplier.type";
import { getDateNow } from "../../../utils/funtion";
import { getValueFromOptions } from "../../../utils/select";
import { IProduct } from "./../../../types/product.type";

type Inputs = {
  sectors: string;
  supplier: string;
  note: string;
  payment: string;
  export_date: Date;
  data: {
    quantity: number;
    price: number;
    amount: number;
    name: string;
    id: number;
    image: string;
  }[];
};

const ExportShipments = () => {
  const [product, setProduct] = useState<any>();
  const [items, setItems] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);
  const [suplierOption, setSuplierOption] = useState<IOption[]>([]);
  const navigate = useNavigate();
  const getDataSupplier = async () => {
    const { data } = await list();
    console.log(data);
    const array: IOption[] = data.map((item: ISupplier) => {
      return {
        label: item.name,
        value: item.status
      };
    });
    setSuplierOption(array);
  };

  useEffect(() => {
    getDataSupplier();
  }, []);

  const getProduct = async (e: string) => {
    try {
      setItems(null);
      const { data } = await productServices.getProducts();
      console.log(data);
      let getProduct: any = [];
      for (let i = 0; i < data.data.length; i++) {
        if (
          data.data[i].name.toLowerCase().includes(e) == true &&
          e != "" &&
          data.data[i].category_id == supplier
        ) {
          getProduct.push(data.data[i]);
        }
      }

      setProduct(getProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(items);
  console.log(supplier);

  const setItem = (e: IProduct) => {
    setProduct([]);
    setItems(e);
  };

  const addPoduct = () => {
    // setData([...data, items]);
    if (fields?.length > 0) {
      let count = 0;
      for (let i = 0; i < fields.length; i++) {
        if (
          fields[i].name == items.name &&
          fields[i].price == items.price &&
          fields[i].quantity == items.quantity
        ) {
          count++;
        }
      }
      if (count == 0) {
        append({
          name: items.name,
          price: items.price,
          quantity: items.quantity,
          amount: 0,
          id: items.id,
          image: items.image
        });
      }
    } else {
      append({
        name: items.name,
        price: items.price,
        quantity: items.quantity,
        amount: 0,
        id: items.id,
        image: items.image
      });
    }
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "data",
      control
    }
  );
  const onSubmit = async (formValue: Inputs) => {
    const export_product = formValue.data.map((item) => {
      return {
        id: item.id,
        quantity: item.amount,
        price: item.price,
        barcode: null
      };
    });
    const newItem = {
      products: export_product,
      // type: 1,
      export_date: getDateNow(),
      user_id: 1,
      address: "HN",
      receve_phone: "1234562345"
    };
    await addRecei(newItem);
    console.log(newItem);
    navigate("/receipt");
  };

  return (
    <form className="grid grid-cols-2 gap-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-1 shadow-md rounded-lg">
        <div className="border-b p-5">
          <p>Thông tin</p>
        </div>
        <div className="p-5">
          <TextField
            label="Loại hàng trả"
            {...register("sectors", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.sectors}
            className="mb-5"
          />

          <Select
            selectLabel={{
              text: "Nhà cung cấp"
            }}
            options={suplierOption}
            option={getValueFromOptions(suplierOption, watch("supplier"))}
            handleClickChange={(brand) => (
              setValue("supplier", brand.value), setSupplier(brand.value)
            )}
            placeholderText="chọn nhà cung cấp"
          />

          <div className="mt-5">
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
            {...register("export_date", {
              required: "bạn chưa nhập form này"
            })}
            error={errors.export_date}
          />
        </div>
      </div>

      <div className="col-span-2 shadow-md  ">
        <div className="p-5 border-b relative">
          <p className="mb-3">Thêm Sản phẩm</p>

          {items != null ? (
            <div className="flex gap-10 ">
              <TextField
                name=""
                type="text"
                onChange={(e: any) => {
                  getProduct(e.target.value);
                }}
                value={items?.name}
                containerClass="grow"
              />
              <Button
                onClick={() => {
                  addPoduct();
                }}
              >
                Tạo
              </Button>
            </div>
          ) : (
            <div className="flex gap-10 ">
              <TextField
                name=""
                type="text"
                onChange={(e: any) => {
                  getProduct(e.target.value);
                }}
                defaultValue={items?.name}
                containerClass="grow"
              />
              <Button
                onClick={() => {
                  addPoduct();
                }}
              >
                Tạo
              </Button>
            </div>
          )}
          {product?.length > 0 ? (
            <select
              multiple
              className="bg-gray-50 border border-gray-300 
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block p-5 dark:bg-gray-700 
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500  
              absolute bottom-0 left-5 right-5 top-full h-max
              "
            >
              {product?.map((item: IProduct) => {
                return (
                  <option onClick={() => setItem(item)} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>

        {fields.length > 0 ? (
          <div className="p-5">
            <table className="mt-3 w-full">
              <thead>
                <tr>
                  <th className="text-left pb-5">ảnh</th>
                  <th className="text-left pb-5">Giá</th>
                  <th className="text-left pb-5">Tồn kho</th>
                  <th className="text-left pb-5">Số lượng</th>
                  <th className="text-left pb-5">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => {
                  return (
                    <tr key={item.id} className="mt-3">
                      <td className="flex items-center">
                        <img
                          src={`${item.image}`}
                          alt="đang load"
                          width="100"
                          height="100"
                        />
                        <p>{item.name}</p>
                      </td>
                      <td className="pr-10">
                        <TextField
                          {...register(`data.${index}.price`)}
                          defaultValue={item.price}
                        />
                      </td>
                      <td className="pr-10">
                        <p>{item.quantity}</p>
                      </td>
                      <td className="pr-10">
                        <TextField
                          {...register(`data.${index}.amount`)}
                          type="number"
                          min={0}
                          max={item.quantity}
                          className="border-white"
                        />
                      </td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => remove(index)}
                          className="h-max "
                          variant="error"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              <Button type="submit" className="mt-3">
                Lưu
              </Button>
              <Button variant="warning" className="mt-3  ml-3">
                <Link to="/receipt">Hủy</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};
export default ExportShipments;
