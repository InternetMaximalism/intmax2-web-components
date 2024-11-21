import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Cross = (props: Props) => {
  return (
    <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
};

export default Cross;