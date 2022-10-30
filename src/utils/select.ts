import IOption from "../types/option.model";

export const getValueFromOptions = (options: IOption[], value: any) => {
  const option = options.find((option) => option.value === value);
  return option;
};
