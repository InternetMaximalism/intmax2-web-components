import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const ArrowLeft = (props: Props) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={props.color || "#4B5563"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
