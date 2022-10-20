import { ReactNode } from "react";
import clsx from "clsx";

import { Button } from "..";
import { CloseIcon } from "../icons";

interface IModalProps {
  visible: boolean;
  icon?: ReactNode;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  showButtons?: boolean;
  children?: ReactNode;
}

const Modal = ({
  visible,
  icon,
  title,
  content,
  okText = "Confirm",
  cancelText = "Cancel",
  onOk,
  onCancel,
  showButtons = true,
  children
}: IModalProps) => {
  return (
    <>
      {visible && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-10" />
          <div className="z-[999] min-w-[375px] p-[30px] rounded-[20px] bg-white text-left shadow-modal">
            <div
              className={clsx(
                "flex items-center mb-6",
                title ? "justify-between" : "justify-end"
              )}
            >
              {title && <p className="font-semibold">{title}</p>}
              <CloseIcon className="cursor-pointer" onClick={onCancel} />
            </div>

            {icon && icon}
            {content && <p className="mb-[30px] text-sm">{content}</p>}
            {children && <div>{children}</div>}

            {showButtons && (
              <div className="flex justify-end items-center gap-x-2 text-sm">
                <Button
                  variant="error"
                  onClick={onCancel}
                  className="py-[6px] px-[12px] bg-white text-red-500 hover:text-white"
                >
                  {cancelText}
                </Button>
                <Button onClick={onOk} className="py-[6px] px-[12px] text-sm">
                  {okText}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
