import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import ImagePreview from "./component/ImagePreview";
import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { ICategory } from "../../../types/category.type";
import { IProduct } from "../../../types/product.type";
import { listCategoryAPI } from "../../../api/category";

import productServices from "../../../api/product.api";
import { getValueFromOptions } from "../../../utils/select";
import ProductSchema from "./ProductForm.schema";
import { WarningIcon } from "../../../components/icons";
import { StatusOptions } from "./ProductForm.constants";

interface IProductProps {
  mode: "create" | "update";
}

type Inputs = {
  sku: string;
  name: string;
  category_id: number | null;
  price: number;
  import_price: number;
  quantity: number;
  description: string;
  warranty_date: number;
  status: 0 | 1;
};

const ProductForm = ({ mode }: IProductProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState<IOption[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(ProductSchema)
  });

  const createProduct = (data: Inputs) => {
    try {
      productServices.createProduct(data);

      toast.success("Thêm sản phẩm thành công", {
        onClose: () => {
          navigate("/products");
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const updateProduct = (data: Inputs) => {
    console.log("update: ", data);
  };

  useEffect(() => {
    listCategoryAPI().then(({ data }) => {
      const categoryOptions: IOption[] = data.map((category: ICategory) => {
        return {
          label: category.name,
          value: category.id
        };
      });

      setCategories(categoryOptions);
    });
  }, []);

  console.log(errors);

  useEffect(() => {
    if (params.id) {
      productServices
        .getProductById(params.id)
        .then(({ data }: { data: IProduct }) => {
          reset({
            sku: data.sku,
            name: data.name,
            category_id: data.category_id,
            price: data.price,
            import_price: data.import_price,
            quantity: data.quantity,
            description: data.description,
            warranty_date: data.warranty_date
          });
        });
    }
  }, [params, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") createProduct(data);
    if (mode === "update") updateProduct(data);
  };

  return (
    <form className="w-9/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <p className="mb-5 text-xl font-semibold">Thông tin cơ bản</p>
        <div className="flex gap-6 mb-5">
          <TextField
            label="Mã sản phẩm"
            containerClass="basis-3/6"
            {...register("sku")}
            error={errors.sku}
          />
          <TextField
            label="Tên sản phẩm"
            containerClass="basis-3/6"
            {...register("name")}
            error={errors.name}
          />
        </div>

        <div className="mb-5">
          <Select
            selectLabel={{
              text: "Danh mục"
            }}
            options={categories}
            option={getValueFromOptions(categories, watch("category_id"))}
            handleClickChange={(cate) => setValue("category_id", cate.value)}
            placeholderText="Chọn danh mục"
          />

          {errors.category_id && (
            <div className="flex mt-1 items-center">
              <WarningIcon />
              <span className="block text-error ml-1.5">
                {errors.category_id.message}
              </span>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-base">Mô tả</label>
          <textarea
            {...register("description")}
            className="w-full border border-[#DEDEDE] rounded-lg outline-none px-4 py-3"
            rows={5}
          ></textarea>
        </div>

        <div>
          <p className="mb-1 text-base">Hình ảnh</p>
          <ImagePreview />
        </div>
      </div>

      <div>
        <p className="mb-5 text-xl font-semibold">Thiết lập giá & kho</p>

        <div className="flex gap-6 mb-5">
          <TextField
            label="Giá nhập"
            containerClass="basis-3/6"
            {...register("import_price")}
            error={errors.import_price}
          />
          <TextField
            label="Giá bán"
            containerClass="basis-3/6"
            {...register("price")}
            error={errors.price}
          />
        </div>
        <TextField
          label="Tồn kho"
          containerClass="mb-5"
          {...register("quantity")}
          error={errors.quantity}
        />
        <div className="flex gap-6 mb-5">
          <div className="basis-3/6">
            <label className="block mb-1 text-base">Số ngày bảo hành</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-[#DEDEDE] rounded-lg outline-none"
              {...register("warranty_date")}
            />
          </div>

          <div className="basis-3/6">
            <Select
              selectLabel={{
                text: "Trạng thái"
              }}
              options={StatusOptions}
              option={getValueFromOptions(StatusOptions, watch("status"))}
              handleClickChange={(status) => setValue("status", status.value)}
              placeholderText="Chọn trạng thái"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <Button type="submit">Thêm sản phẩm</Button>
        <Button variant="warning">Hủy bỏ</Button>
      </div>
    </form>
  );
};

export default ProductForm;
