import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const CircleX = (props: Props) => {
  return (
    <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 9L9 15M9 9L15 15M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke={props.color || "#D26161"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default CircleX;
