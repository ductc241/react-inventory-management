import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { TextField, Select, Button } from "../../../components";
import IOption from "../../../types/option.model";
import { GroupOptions } from "./CategoryForm.constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/slice/category.slice";
interface ICategoryProps {
  mode: "create" | "update";
}

type Inputs = {
  name: string;
  parent_id: number;
};

const CategoryForm = ({ mode }: ICategoryProps) => {
  // const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

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
        name: "San pham 1",
        parent_id: 1
      });
    }
  }, [params, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") createCategory(data);
    if (mode === "update") updateCategory(data);
  };


  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onAdd: SubmitHandler<Inputs> = async (product: Inputs) => {
    try {
      await dispatch(addProduct(product))
      alert("Add Product thành công!")
      navigate("/category")

    } catch (error) {
      console.log(error);

    }
  }

  return (

    <div className="flex items-center justify-center p-12 w-12/12 border p-8 rounded-l shadow-lg">
      <div className="mx-auto w-full max-w-[1000px]">
        <p className="mb-5 text-xl text-black font-semibold">Thêm nhóm hàng</p>  
        <form method="POST" onSubmit={handleSubmit(onAdd)}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
              Tên nhóm
            </label>
            <input type="text" id="name" placeholder="Tên nhóm" {...register('name', { required: true })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md" />
          </div>
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nhóm cha</label>
            <select id="countries" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md">
              <option selected>___ Lựa chọn ___</option>
              <option value="US">Củ sạc</option>
              <option value="CA">Tai Nghe</option>
              <option value="FR">Dây sạc</option>
            </select>
          </div>
          <br />
          <div>
            <button className="hover:shadow-form rounded-md bg-[#4cb050] py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};

export default CategoryForm;
