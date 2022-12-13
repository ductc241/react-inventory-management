import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategory,
  updateCategory
} from "../../../store/slice/category.slice";
import { toast } from "react-toastify";
import { getCategoryAPI } from "../../../api/category";
interface ICategoryProps {
  mode: "create" | "update";
}

type Inputs = {
  name: string;
  parent_id: number;
};

const CategoryUpdate = ({ mode }: ICategoryProps) => {
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getOneProduct = async () => {
      const { data } = await getCategoryAPI(id);
      setData(data);
      reset(data.data);
    };
    getOneProduct();
  }, []);

  const categorys = useSelector((state: any) => state.category?.categorys);
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  const onAdd: SubmitHandler<Inputs> = async (product: Inputs) => {
    try {
      const newProduct = {
        ...data,
        name: product.name,
        parent_id: product.parent_id
      };
      await dispatch(updateCategory(newProduct));
      toast.success("Cập nhập nhóm hàng thành công!");
      navigate("/category");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };
  return (
    <div className="flex items-center justify-center p-12 w-12/12 border p-8 rounded-l shadow-lg">
      <div className="mx-auto w-full max-w-[1000px]">
        <p className="mb-5 text-xl text-black font-semibold">
          Cập nhập nhóm hàng
        </p>
        <form method="POST" onSubmit={handleSubmit(onAdd)}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Tên nhóm
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tên nhóm"
              {...register("name", { required: true })}
              defaultValue={data.name}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md"
            />
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nhóm cha
            </label>
            <select
              id="countries"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md"
            >
              <option selected>___ Lựa chọn ___</option>
              {categorys?.map((item: any) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
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

export default CategoryUpdate;
