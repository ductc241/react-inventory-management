import { SVGProps } from "react";

const PlusIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Filled"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z" />
    </svg>
  );
};

export default PlusIcon;
