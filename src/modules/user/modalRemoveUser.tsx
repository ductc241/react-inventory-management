import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import User from ".";
import { deleteUser, getOneUser } from "../../api/user.api";
import { Modal } from "../../components";
import { isAuthenticated } from "../../utils/localStorage/localStorega";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  getAllUser: any;
  isOpenModalDelete: boolean;
  close: () => void;
  id: any;
};

const ModalRemoveUser = ({
  getAllUser,
  isOpenModalDelete,
  close,
  id
}: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      const getOneUserRemove = async () => {
        const res = await getOneUser(id);

        if (res.status === 200) {
          const { data } = res;
          setName(data.data.name);
        }
      };
      getOneUserRemove();
    }
  }, [id]);

  const handleOk = async () => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      toast.success(`Xoá nhân viên: ${name} thành công`);
      getAllUser();
      close();
    }
    if (res.status !== 200) {
      toast.warning(`Xoá nhân viên: ${name} không thành công`);
    }
  };
  const user = isAuthenticated();
  return (
    <Modal
      visible={isOpenModalDelete}
      title="Xoá nhân viên"
      onCancel={close}
      onOk={() => {
        if (user.role_id === 1) {
          handleOk;
        }
      }}
    >
      <div>Bạn có chắc muốn xoá: {name}</div>
    </Modal>
  );
};

export default ModalRemoveUser;
