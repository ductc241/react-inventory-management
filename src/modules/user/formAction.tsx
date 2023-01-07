import { Button, Modal, TextField } from "../../components";
import { UserAction } from "../../types/user.type";
import { useForm, Controller } from "react-hook-form";
import { createUser, getOneUser, updateUser } from "../../api/user.api";
import { toast } from "react-toastify";
import { useEffect } from "react";

type Props = {
  open: boolean;
  close: () => void;
  types: UserAction;
  id?: any;
  getAllUser?: any;
};

type infoUser = {
  name: string;
  email: string;
  password: string;
  phone_number: number;
  gender: string;
  role_id: string;
};

const FornAction = ({ open, close, types, id, getAllUser }: Props) => {
  const { control, handleSubmit, register, reset } = useForm<infoUser>();

  useEffect(() => {
    if (types === UserAction.EDIT) {
      const getOneUserData = async () => {
        const res = await getOneUser(id);
        if (res.status === 200) {
          const { data } = res;
          reset(data.data);
        }
      };
      getOneUserData();
    }
  }, [id, reset, types]);

  const onSubmit = async (data: infoUser) => {
    const { gender, role_id, name, password, phone_number, email } = data;

    const cloneData = {
      name,
      email,
      password,
      phone_number,
      gender: +gender,
      role_id: +role_id
    };

    if (types === UserAction.ADD) {
      const res = await createUser(cloneData);

      if (res.status === 200) {
        getAllUser();
        close();
        reset();
        toast.success("Thêm nhân viên thành công");
      }
      if (res.status !== 200) {
        toast.warning("Lỗi!");
      }
    }

    if (types === UserAction.EDIT) {
      const res = await updateUser(id, cloneData);

      console.log(res);

      if (res.status === 200) {
        getAllUser();
        close();
        reset();
        toast.success("Thêm nhân viên thành công");
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
      title={types === UserAction.ADD ? "Thêm nhân viên" : "Chỉnh sửa nhân viên"}
    >
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center w-[500px]">
          <div className="w-[50%] flex flex-col gap-3">
            <TextField
              label="Tên nhân viên"
              {...register("name", { required: true })}
              required
            />
            <TextField
              label="Số điện thoại"
              {...register("phone_number", { required: true })}
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
              name="gender"
              defaultValue={""}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-3">
            <TextField
              label="Email"
              {...register("email", { required: true })}
              required
            />
            <TextField
              label="Mật khẩu"
              type={"password"}
              {...register("password", { required: true })}
              required
            />
            <Controller
              render={({ field }) => (
                <select className="border h-12 rounded-lg px-3" {...field}>
                  <option value={""}>-- Chức vụ --</option>
                  <option value={0}>Nhân viên</option>
                  <option value={1}>Admin</option>
                </select>
              )}
              control={control}
              name="role_id"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="submit">Thêm nhân viên</Button>
        </div>
      </form>
    </Modal>
  );
};

export default FornAction;
