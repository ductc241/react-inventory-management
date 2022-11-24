import IOption from "../types/option.model";

export const getValueFromOptions = (options: IOption[], value: any) => {
  const option = options.find((option) => option.value === value);
  return option;
};

export const convertDataToOption = (arr: []) => {
  const optionArr: IOption[] = arr.map((item: any) => {
    return {
      label: item.name,
      value: item.id
    };
  });

  return optionArr;
};
