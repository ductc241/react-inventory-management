import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ShipmentsForm = () => {
  const { register, reset, formState, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <span>Thêm hàng hoá</span>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
};

export default ShipmentsForm;
