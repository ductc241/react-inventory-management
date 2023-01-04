import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, listCategory } from "../../../store/slice/category.slice";
import { toast } from "react-toastify";
interface ICategoryProps {
  mode: "create" | "update";
}

type Inputs = {
  name: string;
  parent_id: number;
};

const CategoryAdd = ({ mode }: ICategoryProps) => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    if (params.id) {
      console.log("id: ", params.id);
      reset({
        name: "San pham 1",
        parent_id: 1
      });
    }
  }, [params, reset]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onAdd: SubmitHandler<Inputs> = async (product: Inputs) => {
    try {
      await dispatch(addCategory(product));
      toast.success("Thêm nhóm hàng thành công!");
      navigate("/category");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };
  const categorys = useSelector((state: any) => state.category?.categorys);

  useEffect(() => {
    dispatch(listCategory());
<<<<<<< HEAD
    // console.log(categorys);
=======
>>>>>>> 664d1984db3391cc4c381248f42be28d26e53cc7
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center p-12 w-12/12 border p-8 rounded-l shadow-lg">
      <div className="mx-auto w-full max-w-[1000px]">
        <p className="mb-5 text-xl text-black font-semibold">Thêm nhóm hàng</p>
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
<<<<<<< HEAD
<<<<<<< HEAD
                if (!item) return '';
=======
                if (!item) return "";
>>>>>>> 664d1984db3391cc4c381248f42be28d26e53cc7
=======
                if (!item) return "";
>>>>>>> 9c37a967c0e45584fef4d8ad3e5c4e4e1feb0593
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

export default CategoryAdd;
