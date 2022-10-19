import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  ComponentPropsWithoutRef
} from "react";
import clsx from "clsx";

import IOption from "../../types/option.model";
import { ArrowDownIcon } from "../icons";

import styles from "./Select.module.css";

interface LabelProps {
  htmlFor?: string;
  text?: string;
  labelClassName?: string;
  required?: boolean;
}

interface SelectProps extends ComponentPropsWithoutRef<"div"> {
  options: IOption[];
  handleClickChange: (option: IOption) => void;
  option?: IOption;
  placeholderText?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  position?: string;
  selectLabel?: LabelProps;
  required?: boolean;
}

const Select = ({
  options,
  option,
  placeholderText,
  className,
  wrapperClassName,
  position,
  handleClickChange,
  selectLabel,
  required,
  ...props
}: SelectProps) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleCLickOPen = () => {
    setIsDropDown(!isDropDown);
  };

  const handleClickOption = (selectedOption: IOption) => {
    option !== selectedOption && handleClickChange(selectedOption);
    setIsDropDown(false);
  };

  const handleClickOutsideSelect = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (selectRef.current && !selectRef.current?.contains(event.target)) {
        setIsDropDown(false);
      }
    }
  };

  const renderPlaceHolder = () => {
    if (option && Object.keys(option).length === 0 && !placeholderText) {
      return options[0].label;
    }
    if (option && Object.keys(option).length > 0) {
      return option.label;
    }
    if (!option && placeholderText) {
      return placeholderText;
    }
    return options[0].label;
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSelect);
    return () => {
      document.removeEventListener("click", handleClickOutsideSelect);
    };
  }, []);

  return (
    <div>
      {selectLabel && (
        <div className={clsx("text-base mb-1", selectLabel.labelClassName)}>
          <label htmlFor={selectLabel.htmlFor}>{selectLabel.text}</label>
          {required && <span className="ml-1 text-error">*</span>}
        </div>
      )}
      <div
        className={clsx("relative w-full", wrapperClassName)}
        ref={selectRef}
      >
        <div
          className={clsx(
            "w-full flex justify-between items-center px-4 py-3 h-12 border border-solid rounded-lg cursor-pointer select-none",
            isDropDown ? "border-orange-secondary" : "border-[#DEDEDE]",
            className
          )}
          onClick={handleCLickOPen}
          {...props}
        >
          {renderPlaceHolder()}
          <div className={styles.iconArrow}>
            <ArrowDownIcon
              className={clsx(
                "transition-all ease-in duration-300",
                isDropDown && "rotate-180"
              )}
              width={16}
              height={16}
            />
          </div>
        </div>
        <div
          className={clsx(
            "w-full absolute bg-white border border-solid border-[#DEDEDE] rounded-lg max-h-[340px] overflow-y-auto shadow-[0px_0px_10px_#7979791A] z-50",
            isDropDown ? "block mt-1" : "hidden",
            position && position
          )}
        >
          {options.map((item) => (
            <div
              key={item.value}
              className={clsx(
                "py-3 px-4 cursor-pointer hover:text-orange-primary transition duration-300 hover:bg-zinc-200",
                item.value === option?.value && "text-orange-secondary"
              )}
              onClick={() => handleClickOption(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
