import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import TextField from "../../components/TextField/TextField";
import { ISupplier } from "../../types/supplier.type";

type Inputs = {
  supplierCode: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  taxCode: string;
  area: string;
  group: string;
  wards: string;
  note: string;
};

type Props = {
  hidenModal: boolean;
  upload: (e: boolean) => void;
  uploadData: (e: any) => void;
  data: any;
  itemUpdate: any;
  uploadItemUpdate: (e: ISupplier | null) => void;
};

const FormSupplier = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (item: any) => {
    if (props?.itemUpdate.length < 1) {
      const newData = {
        ...item,
        phone_number: null
      };
      props.uploadData(newData);
    } else {
      const newData = {
        id: props?.itemUpdate[0].id,
        ...item
      };
      props.uploadItemUpdate(newData);
    }

    reset();
    props.upload(false);
  };

  return (
    <>
      <Modal
        visible={props.hidenModal}
        showButtons={false}
        title="Thêm nhà cung cấp"
        onCancel={() => {
          reset();
          props.uploadItemUpdate(null);
          props.upload(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-[800px] ">
          <div className="grid grid-cols-12 gap-4 mt-3">
            <TextField
              label="Nhà cung cấp"
              containerClass="col-span-6 mb-3"
              {...register("name", {
                required: "bạn chưa nhập form này"
              })}
              error={errors.name}
              defaultValue={
                props.itemUpdate.length > 0 ? props?.itemUpdate[0].name : ""
              }
            />

            {/* <TextField
              label="Email"
              containerClass="col-span-6 mb-3"
              {...register("email", { required: "bạn chưa nhập form này" })}
              error={errors.email}
              defaultValue={
                props.itemUpdate.length > 0 ? props?.itemUpdate[0].email : ""
              }
            /> */}

            {/* <TextField
              label="Điện thoại"
              containerClass="col-span-6 mb-3"
              {...register("phone", { required: "bạn chưa nhập form này" })}
              error={errors.phone}
              defaultValue={
                props.itemUpdate.length > 0 ? props?.itemUpdate[0].phone : ""
              }
            /> */}

            <TextField
              label="Địa chỉ"
              containerClass="col-span-6 mb-3"
              {...register("address", { required: "bạn chưa nhập form này" })}
              error={errors.address}
              defaultValue={
                props.itemUpdate.length > 0 ? props?.itemUpdate[0].address : ""
              }
            />
          </div>
          <div className="flex justify-end items-center gap-x-2 text-sm">
            <Button type="submit" className="py-[12px] px-[30px] text-sm">
              {props.itemUpdate.length > 0 ? "Edit" : "Thêm"}
            </Button>
            <Button
              onClick={() => {
                props.uploadItemUpdate(null);
                reset();
                props.upload(false);
              }}
              className="py-[12px] px-[30px] bg-white text-black"
            >
              Thoát
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormSupplier;
