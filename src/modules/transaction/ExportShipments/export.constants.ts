import IOption from "../../../types/option.model";

const EXPORT_TYPES: IOption[] = [
  {
    label: "Khách hàng",
    value: 1
  },
  {
    label: "Đối tượng khác",
    value: 2
  }
];

const IMPORT_TYPES: IOption[] = [
  {
    label: "Nhà cung cấp",
    value: 1
  },
  {
    label: "Đối tượng khác",
    value: 2
  }
];

const PAYMENT_TYPES: IOption[] = [
  {
    label: "Thanh toán trực tiếp",
    value: 1
  },
  {
    label: "Chuyển khoản",
    value: 2
  }
];

export { EXPORT_TYPES, IMPORT_TYPES, PAYMENT_TYPES };
