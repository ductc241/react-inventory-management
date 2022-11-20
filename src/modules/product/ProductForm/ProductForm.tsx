import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { ICategory } from "../../../types/category.type";
import { IProduct } from "../../../types/product.type";
import { listCategoryAPI } from "../../../api/category";

import productServices from "../../../api/product.api";
import { getValueFromOptions } from "../../../utils/select";
import ProductSchema from "./ProductForm.schema";
import { WarningIcon } from "../../../components/icons";

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
  weight: number;
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
      const categoryOptions: IOption[] = data.data.map(
        (category: ICategory) => {
          console.log(category);

          return {
            label: category.name,
            value: category.id
          };
        }
      );

      setCategories(categoryOptions);
    });
  }, []);

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
            weight: data.weight
          });
        });
    }
  }, [params, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") createProduct(data);
    if (mode === "update") updateProduct(data);
  };

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-6">
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

          <div>
            <p className="mb-1 text-base">Hình ảnh</p>
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64  rounded-lg border-2 border-gray-300 border-dashed cursor-pointer  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-6">
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
          <TextField
            label="Trọng lượng"
            containerClass="mb-5"
            {...register("weight")}
          />
        </div>
      </div>

      <div className="flex gap-5 mt-10">
        <Button type="submit">Thêm sản phẩm</Button>
        <Button variant="warning">Hủy bỏ</Button>
      </div>
    </form>
  );
};

export default ProductForm;
