import { useEffect, useState } from "react";
import { getDetailRefund } from "../../api/refund";
import { Modal } from "../../components";

type Props = {
  open: boolean;
  id: number;
  handleCancel: any;
};

const ModalDetailRefund = (props: Props) => {
  const { open, handleCancel, id } = props;
  const [data, setData] = useState([]);
  const handleCancelModal = () => {
    handleCancel();
  };

  useEffect(() => {
    const fetchDetailRefund = async () => {
      if (id != 0) {
        const res = await getDetailRefund(id);
        setData(res.data);
      }
    };
    fetchDetailRefund();
  }, [id]);

  return (
    <Modal visible={open} showButtons={false} onCancel={handleCancelModal}>
      ABC
    </Modal>
  );
};

export default ModalDetailRefund;
