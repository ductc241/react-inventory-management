import { forwardRef, Ref } from "react";
import clsx from "clsx";

import { TextFieldProps } from "./TextField.types";
import WarningIcon from "../icons/WarningIcon";

const TextField = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement>) => {
    const {
      className,
      containerClass,
      label,
      name,
      error,
      required,
      ...propsInput
    } = props;

    return (
      <div className={containerClass}>
        {label && (
          <label htmlFor={name} className="block mb-1 text-base">
            {label}
            {required && <span className="ml-1 text-red-secondary">*</span>}
          </label>
        )}

        <input
          type="text"
          id={name}
          name={name}
          className={clsx(
            "border border-[#DEDEDE] rounded-lg outline-none",
            "w-full px-4 py-3 py-5 h-12",
            error ? "focus:border-red-500" : "focus:border-blue-500",
            className
          )}
          ref={ref}
          {...propsInput}
        />

        {error && (
          <div className="flex mt-1 items-center">
            <WarningIcon />
            <span className="block text-error ml-1.5">{error.message}</span>
          </div>
        )}
      </div>
    );
  }
);

export default TextField;
