import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CategoryAction } from "../../../types/category.type";
import { addCategoryAPI, getCategoryAPI, updateCategoryAPI } from "../../../api/category";
import { TextField, Modal, Button } from "../../../components";


type Props = {
  openCate: boolean;
  closeCate: () => void;
  typeCate: CategoryAction;
  idCate?: any;
  getAllCate?: any;
};

type Inputs = {
  name: string;
  parent_id: number;
};

// const CategoryAdd = ({ mode }: ICategoryProps) => {
//   const params = useParams();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors }
//   } = useForm<Inputs>();

//   useEffect(() => {
//     if (params.id) {
//       console.log("id: ", params.id);
//       reset({
//         name: "San pham 1",
//         parent_id: 1
//       });
//     }
//   }, [params, reset]);

//   const dispatch = useDispatch<any>();
//   const navigate = useNavigate();

//   const onAdd: SubmitHandler<Inputs> = async (product: Inputs) => {
//     try {
//       await dispatch(addCategory(product));
//       toast.success("Thêm nhóm hàng thành công!");
//       navigate("/category");
//     } catch (error) {
//       toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
//     }
//   };
//   const categorys = useSelector((state: any) => state.category?.categorys);

//   useEffect(() => {
//     dispatch(listCategory());
//     // console.log(categorys);
//   }, [dispatch]);

//   return (
//     <div className="flex items-center justify-center p-12 w-12/12 border p-8 rounded-l shadow-lg">
//       <div className="mx-auto w-full max-w-[1000px]">
//         <p className="mb-5 text-xl text-black font-semibold">Thêm nhóm hàng</p>
//         <form method="POST" onSubmit={handleSubmit(onAdd)}>
//           <div className="mb-5">
//             <label
//               htmlFor="name"
//               className="mb-3 block text-base font-medium text-[#07074D]"
//             >
//               Tên nhóm
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Tên nhóm"
//               {...register("name", { required: true })}
//               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="countries"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Nhóm cha
//             </label>
//             <select
//               id="countries"
//               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#4cb050] focus:shadow-md"
//             >
//               <option selected>___ Lựa chọn ___</option>
//               {categorys?.map((item: any) => {
//                 if (!item) return "";
//                 return (
//                   <option key={item.id} value={item.name}>
//                     {item.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <br />
//           <div>
//             <button className="hover:shadow-form rounded-md bg-[#4cb050] py-3 px-8 text-base font-semibold text-white outline-none">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const CategoryAdd = ({ openCate, closeCate, typeCate, idCate, getAllCate }: Props) => {
  const { control, handleSubmit, register, reset } = useForm<Inputs>();

  useEffect(() => {
    if (typeCate === CategoryAction.EDIT) {
      const getOneCategoryData = async () => {
        const res = await getCategoryAPI(idCate);
        if (res.status === 200) {
          const { data } = res;
          reset(data.data);
        }
      };
      getOneCategoryData();
    }
  }, [idCate, reset, typeCate]); 

  const onSubmit = async (data: Inputs) => {
    const { name, parent_id } = data;

    const cloneData = {
      name,
      parent_id,
    };

    if (typeCate === CategoryAction.ADD) {
      const res = await addCategoryAPI(cloneData);

      if (res.status === 200) {
        getAllCate();
        closeCate();
        reset();
        toast.success("Thêm hàng hoá thành công");
      }
      if (res.status !== 200) {
        toast.warning("Lỗi!");
      }
    }

    if (typeCate === CategoryAction.EDIT) {
      const res = await updateCategoryAPI(idCate, cloneData);
      if (res.status === 200) {
        getAllCate();
        closeCate();
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
      visible={openCate}
      onCancel={closeCate}
      title={typeCate === CategoryAction.ADD ? "Thêm hàng hoá" : "Chỉnh sửa hàng hoá"}
    >
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center w-[500px]">
          <div className="w-[50%] flex flex-col gap-3">
            <TextField
              label="Tên hàng hoá"
              {...register("name", { required: true })}
              required
            />

            <Controller
              render={({ field }) => (
                <select className="border h-12 rounded-lg px-3" {...field}>
                  <option value={""}>-- Chọn giới tính của bạn --</option>
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                </select>
              )}
              control={control}
              name="parent_id"
              defaultValue={0}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="submit">Thêm Hàng Hoá</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryAdd;
