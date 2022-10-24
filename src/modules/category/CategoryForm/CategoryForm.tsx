import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { BrandOptions, GroupOptions } from "./CategoryForm.constants";
import { useEffect } from "react";
interface ICategoryProps {
  mode: "create" | "update";
}

type Inputs = {
  sku: string;
  name: string;
  brand: string;
  category_id: string;
  price: number;
  import_price: number;
  quantity: number;
  weight: number;
};

const CategoryForm = ({ mode }: ICategoryProps) => {
  // const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const createCategory = (formData: Inputs) => {
    console.log("create: ", formData);
  };

  const updateCategory = (formData: Inputs) => {
    console.log("update: ", formData);

    if (params.id) {
      console.log("id: ", params.id);
    }
  };

  useEffect(() => {
    if (params.id) {
      console.log("id: ", params.id);
      reset({
        sku: "San pham 1",
        name: "San pham 1",
        brand: "San pham 1",
        category_id: "San pham 1",
        price: 10,
        import_price: 10,
        quantity: 10,
        weight: 10
      });
    }
  }, [params, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") createCategory(data);
    if (mode === "update") updateCategory(data);
  };

  return (
    <form className="w-9/12" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <p className="mb-5 text-xl font-semibold">Thông tin cơ bản</p>
        <div className="flex gap-6 mb-5">
          <TextField
            label="Mã sản phẩm"
            containerClass="basis-3/6"
            {...register("category_id")}
          />
          <TextField
            label="Tên sản phẩm"
            containerClass="basis-3/6"
            {...register("name")}
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
            text: "Danh mục"
          }}
          options={GroupOptions}
          handleClickChange={(data: IOption) => console.log(data)}
        />
      </div>

      <div>
        <p className="mb-5 text-xl font-semibold">Thiết lập giá & kho</p>

        <div className="flex gap-6 mb-5">
          <TextField
            label="Giá nhập"
            containerClass="basis-3/6"
            {...register("import_price")}
          />
          <TextField
            label="Giá bán"
            containerClass="basis-3/6"
            {...register("price")}
          />
        </div>
        <TextField
          label="Tồn kho"
          containerClass="mb-5"
          {...register("quantity")}
        />
        <TextField
          label="Trọng lượng"
          containerClass="mb-5"
          {...register("weight")}
        />
      </div>

      <div className="flex gap-5">
        <Button type="submit">Thêm sản phẩm</Button>
        <Button variant="warning">Hủy bỏ</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
