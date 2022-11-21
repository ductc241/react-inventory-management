import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { ICategory } from "../../../types/category.type";
import { IProduct, IProductCreate } from "../../../types/product.type";
import { listCategoryAPI } from "../../../api/category";
import * as SupplierServices from "../../../api/supplier.api";

import productServices from "../../../api/product.api";
import { getValueFromOptions } from "../../../utils/select";
import ProductSchema from "./ProductForm.schema";
import { WarningIcon } from "../../../components/icons";
import ImagePreview from "./component/ImagePreview";
import { StatusOptions } from "./ProductForm.constants";

interface IProductProps {
  mode: "create" | "update";
}

const ProductForm = ({ mode }: IProductProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState<IOption[]>([]);
  const [suppliers, setSuppliers] = useState<IOption[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<IProductCreate>({
    resolver: yupResolver(ProductSchema)
  });

  const createProduct = (data: IProductCreate) => {
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

  const updateProduct = (data: IProductCreate) => {
    console.log("update: ", data);
  };

  useEffect(() => {
    const getOptions = async () => {
      const valueOptions = await Promise.all([
        listCategoryAPI(),
        SupplierServices.list()
      ]);

      setCategories(valueOptions[0].data.data);
      setSuppliers(valueOptions[1].data);
    };

    getOptions();

    // listCategoryAPI().then(({ data }) => {
    //   const categoryOptions: IOption[] = data.data.map(
    //     (category: ICategory) => {
    //       console.log(category);

    //       return {
    //         label: category.name,
    //         value: category.id
    //       };
    //     }
    //   );

    //   setCategories(categoryOptions);
    // });
  }, []);

  useEffect(() => {
    if (params.id) {
      productServices
        .getProductById(params.id)
        .then(({ data }: { data: IProduct }) => {
          reset({
            name: data.name,
            category_id: data.category_id,
            price: data.price,
            import_price: data.import_price,
            quantity: data.quantity
          });
        });
    }
  }, [params, reset]);

  const onSubmit: SubmitHandler<IProductCreate> = (data) => {
    if (mode === "create") createProduct(data);
    if (mode === "update") updateProduct(data);
  };

  return (
    <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-6">
          <div className="shadow-md">
            <div className="px-5 py-4 bg-gray-100">
              <p className="text-xl font-semibold">Thông tin cơ bản</p>
            </div>

            <div className="px-5 py-7">
              <TextField
                label="Tên sản phẩm"
                containerClass="mb-5"
                {...register("name")}
                error={errors.name}
              />

              <div className="mb-5">
                <Select
                  selectLabel={{
                    text: "Danh mục"
                  }}
                  options={categories}
                  option={getValueFromOptions(categories, watch("category_id"))}
                  handleClickChange={(cate) =>
                    setValue("category_id", cate.value)
                  }
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
                <p className="mb-1 text-base">Ảnh đại diện</p>
                <ImagePreview />
              </div>

              <div className="mb-5">
                <Select
                  selectLabel={{
                    text: "Trạng thái"
                  }}
                  options={StatusOptions}
                  option={getValueFromOptions(StatusOptions, watch("status"))}
                  handleClickChange={(cate) =>
                    setValue("category_id", cate.value)
                  }
                  placeholderText="Chọn trạng thái"
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
                <TextField
                  label="Số tháng bảo hành"
                  containerClass="mb-5"
                  {...register("warranty_date")}
                  error={errors.name}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6 h-max">
          <div className="shadow-md mb-10">
            <div className="px-5 py-4 bg-gray-100">
              <p className="text-xl font-semibold">Thiết lập giá</p>
            </div>

            <div className="px-5 py-7">
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
            </div>
          </div>

          {mode === "create" && (
            <div className="shadow-md">
              <div className="px-5 py-4 bg-gray-100">
                <p className="text-xl font-semibold">Tồn kho</p>
              </div>

              <div className="px-5 py-7">
                <TextField
                  name="test-1"
                  label="Số lượng"
                  containerClass="mb-5"
                />
                <TextField name="test-2" label="Nhà cung cấp" />

                <div className="mb-5">
                  <Select
                    selectLabel={{
                      text: "Nhà cung cấp"
                    }}
                    options={suppliers}
                    option={getValueFromOptions(
                      suppliers,
                      watch("supplier_id")
                    )}
                    handleClickChange={(supplier) =>
                      setValue("supplier_id", supplier.value)
                    }
                    placeholderText="Chọn nhà cung cấp"
                  />

                  {errors.supplier_id && (
                    <div className="flex mt-1 items-center">
                      <WarningIcon />
                      <span className="block text-error ml-1.5">
                        {errors.supplier_id.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
