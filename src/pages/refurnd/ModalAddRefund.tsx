import { Modal } from "../../components";

type Props = {
  open: boolean;
  handleCancel: any;
};

const ModalAddRefund = (props: Props) => {
  const { open, handleCancel } = props;
  const handleCancelModal = () => {
    handleCancel();
  };
  return (
    <Modal visible={open} onCancel={handleCancelModal}>
      Add
    </Modal>
  );
};

export default ModalAddRefund;
