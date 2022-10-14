import clsx from "clsx";
import LoadingIcon from "../icons/LoadingIcon";

const Spinner = ({ className }: { className?: string }) => (
  <div className={clsx("flex w-6 h-6 items-center", className)}>
    <LoadingIcon className="animate-spinner" />
  </div>
);

export default Spinner;
