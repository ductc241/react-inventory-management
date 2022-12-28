import React, { SVGProps } from "react";

const PieChartIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path d="M11,23.97A10.97,10.97,0,0,1,11,2.03h1l.013,1L12,12H21.97v1A10.982,10.982,0,0,1,11,23.97ZM10.012,4.085A8.97,8.97,0,1,0,19.915,14H10Z" />
      <path d="M16.019,2.288A8,8,0,0,1,21.733,8H16.019V2.288m-2-2.254V10h9.968A10.015,10.015,0,0,0,14.019.034Z" />
    </svg>
  );
};

export default PieChartIcon;
