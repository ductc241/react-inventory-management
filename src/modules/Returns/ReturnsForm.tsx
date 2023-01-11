import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ReturnsAction } from "../../types/returns.type";

import {
  addReturnsAPI,
  getReturnsAPI,
  updateReturnsAPI
} from "../../api/returns.api";
import { Button, Modal, TextField } from "../../components";

type Props = {
  open: boolean;
  close: () => void;
  id?: any;
  getAllCate?: any;
  typeCate: any;
};

type ReturnsInputs = {
  user_id: number;
  user_name: string;
  seller_name: string;
  refund_code: string;
  refund_price_totail: number;
  refund_totall_quantity: number;
  status: number;
  description: string;
  refund_type: number;
};

const ReturnsForm = ({ open, close, id, typeCate, getAllCate }: Props) => {
  const { control, handleSubmit, register, reset } = useForm<ReturnsInputs>();

  useEffect(() => {
    if (typeCate === ReturnsAction.EDIT) {
      const getOneCategoryData = async () => {
        const res = await getReturnsAPI(id);
        if (res.status === 200) {
          const { data } = res;
          reset(data.data);
        }
      };
      getOneCategoryData();
    }
  }, [id, reset, typeCate]);

  const onSubmit = async (data: ReturnsInputs) => {
    const { user_id,
      user_name,
      seller_name,
      refund_code,
      refund_price_totail,
      refund_totall_quantity,
      status,
      description,
      refund_type } = data;

    const cloneData = {
      user_id,
      user_name,
      seller_name,
      refund_code,
      refund_price_totail,
      refund_totall_quantity,
      status,
      description,
      refund_type
    };

    if (typeCate === ReturnsAction.ADD) {
      const res = await addReturnsAPI(cloneData);

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

    if (typeCate === ReturnsAction.EDIT) {
      const res = await updateReturnsAPI(id, data);
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
        typeCate === ReturnsAction.ADD ? "Thêm hàng hoá" : "Chỉnh sửa hàng hoá"
      }
    >
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center w-[500px]">
          <div className="w-[100%] flex flex-col gap-3 mb-4">
            <TextField
              label="Tên hàng hoá"
              {...register("seller_name", { required: true })}
              required
            />

            <Controller
              render={({ field }) => (
                <div>
                  <p>Nhóm</p>
                  <select className="border h-12 rounded-lg px-3 w-[100%]" {...field}>
                    <option value={0}>-- Lựa chọn --</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
              )}
              control={control}
              name="user_id"
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

export default ReturnsForm;
