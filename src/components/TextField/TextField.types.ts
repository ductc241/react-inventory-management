import { ComponentPropsWithoutRef } from "react";
import { FieldError } from "react-hook-form";

export interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: string;
  containerClass?: string;
  error?: FieldError;
  required?: boolean;
}
