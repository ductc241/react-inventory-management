import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategoryAPI, removeCategoryAPI } from "../../api/category";
import { Modal } from "../../components";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  getAllCategory: any;
  isOpenModalDelete: boolean;
  close: () => void;
  id: any;
};

const ModalRemoveCategory = ({
  getAllCategory,
  isOpenModalDelete,
  close,
  id
}: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      const getOneCategoryRemove = async () => {
        const res = await getCategoryAPI(id);

        if (res.status === 200) {
          const { data } = res;
          setName(data.data.name);
        }
      };
      getOneCategoryRemove();
    }
  }, [id]);

  const handleOk = async () => {
    const res = await removeCategoryAPI(id);
    if (res.status === 200) {
      toast.success(`Xoá hàng hoá: ${name} thành công`);
      getAllCategory();
      close();
    }
    if (res.status !== 200) {
      toast.warning(`Xoá hàng hoá: ${name} không thành công`);
    }
  };
  return (
    <Modal
      visible={isOpenModalDelete}
      title="Xoá hàng hoá"
      onCancel={close}
      onOk={handleOk}
    >
      <div>Bạn có chắc muốn xoá: {name}</div>
    </Modal>
  );
};

export default ModalRemoveCategory;
