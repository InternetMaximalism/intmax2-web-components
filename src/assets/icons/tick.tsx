import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const Tick = (props: Props) => {
  return (
    <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke={props.color || "white"} strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
  );
};

export default Tick;






