import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowRight = (props: Props) => {
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
        d="M4.1665 9.99999H15.8332M15.8332 9.99999L9.99984 4.16666M15.8332 9.99999L9.99984 15.8333"
        stroke={props.color || "#4B5563"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
