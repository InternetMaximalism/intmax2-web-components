
import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ChevronRight = (props: Props) => {
  return (
    <svg className={props.className} width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke={props.color || "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ChevronRight;
