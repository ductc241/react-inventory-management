import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CategoryAction } from "../../../types/category.type";
import {
  addCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI
} from "../../../api/category";
import { TextField, Modal, Button } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import CategorySchema from "../CategoryForm.schema";
import { WarningIcon } from "../../../components/icons";

type Props = {
  open: boolean;
  close: () => void;
  id?: any;
  getAllCate?: any;
  typeCate: any;
};

type Inputs = {
  name: string;
  parent_id: any;
};

const CategoryForm = ({ open, close, id, typeCate, getAllCate }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(CategorySchema) });
  useEffect(() => {
    if (typeCate === CategoryAction.EDIT) {
      const getOneCategoryData = async () => {
        const res = await getCategoryAPI(id);
        if (res.status === 200) {
          const { data } = res;
          reset(data.data);
        }
      };
      getOneCategoryData();
    }
  }, [id, reset, typeCate]);

  const onSubmit = async (data: Inputs) => {
    const { name, parent_id } = data;

    const cloneData = {
      name,
      parent_id
    };

    if (typeCate === CategoryAction.ADD) {
      const res = await addCategoryAPI(cloneData);

      if (res.status === 200) {
        getAllCate();
        close();
        reset();
        toast.success("Thêm hàng hoá thành công");
      }
      if (res.status !== 200) {
        toast.warning("Lỗi!");
      }
    }

    if (typeCate === CategoryAction.EDIT) {
      const res = await updateCategoryAPI(id, data);
      if (res.status === 200) {
        getAllCate();
        close();
        reset();
        toast.success("Thêm hàng hoá thành công");
      }
      if (res.status !== 200) {
        toast.warning("Lỗi!");
      }
    }
  };
  return (
    <Modal
      showButtons={false}
      visible={open}
      onCancel={close}
      title={
        typeCate === CategoryAction.ADD ? "Thêm hàng hoá" : "Chỉnh sửa hàng hoá"
      }
    >
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center w-[500px]">
          <div className="w-[100%] flex flex-col gap-3 mb-4">
            <TextField
              label="Tên hàng hoá"
              {...register("name")}
              error={errors.name}
            />

            <Controller
              render={({ field }) => (
                <div>
                  <p>Nhóm</p>
                  <select
                    className="border h-12 rounded-lg px-3 w-[100%]"
                    {...field}
                  >
                    <option value={0}>-- Lựa chọn --</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
              )}
              control={control}
              defaultValue={0}
              {...register("parent_id")}
            />
            {errors.parent_id && (
              <div className="flex mt-1 items-center">
                <WarningIcon />
                <span className="block text-error ml-1.5">
                  {errors.name?.message}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="submit">Thêm Hàng Hoá</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryForm;
