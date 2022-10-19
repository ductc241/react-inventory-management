import { useForm, SubmitHandler } from "react-hook-form";

import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { BrandOptions, GroupOptions } from "./ProductForm.constants";
interface IProductProps {
  mode: "create" | "update";
}

type Inputs = {
  code: string;
  name: string;
  brand: string;
  group: string;
  price: number;
  price_cost: number;
  quantity: number;
  weight: number;
};

const ProductForm = ({ mode }: IProductProps) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const createProduct = (data: Inputs) => {
    console.log("create: ", data);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") createProduct(data);
  };

  return (
    <form className="w-9/12" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <p className="mb-5 text-xl font-semibold">Thông tin cơ bản</p>
        <div className="flex gap-6 mb-5">
          <TextField
            label="Mã sản phẩm"
            containerClass="basis-3/6"
            {...register("code")}
          />
          <TextField
            name="name"
            label="Tên sản phẩm"
            containerClass="basis-3/6"
          />
        </div>
        <Select
          className="mb-5"
          selectLabel={{
            text: "Thương hiệu"
          }}
          options={BrandOptions}
          handleClickChange={(data: IOption) => console.log(data)}
        />
        <Select
          className="mb-5"
          selectLabel={{
            text: "Nhóm hàng"
          }}
          options={GroupOptions}
          handleClickChange={(data: IOption) => console.log(data)}
        />
      </div>

      <div>
        <p className="mb-5 text-xl font-semibold">Thiết lập giá & kho</p>

        <div className="flex gap-6 mb-5">
          <TextField
            name="price_cost"
            label="Giá gốc"
            containerClass="basis-3/6"
          />
          <TextField name="price" label="Giá bán" containerClass="basis-3/6" />
        </div>
        <TextField name="quantity" label="Tồn kho" containerClass="mb-5" />
        <TextField name="weight" label="Trọng lượng" containerClass="mb-5" />
      </div>

      <div className="flex gap-5">
        <Button type="submit">Thêm sản phẩm</Button>
        <Button variant="warning">Hủy bỏ</Button>
      </div>
    </form>
  );
};

export default ProductForm;
