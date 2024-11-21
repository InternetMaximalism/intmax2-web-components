import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const ChevronsRight = (props: Props) => {
  return (
    <svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M13 17L18 12L13 7M6 17L11 12L6 7" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
  )
};

export default ChevronsRight;


