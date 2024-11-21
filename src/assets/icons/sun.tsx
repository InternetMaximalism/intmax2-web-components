import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const Sun = (props: Props) => {
  return (
    <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3_459)">
        <path
          d="M12 1V3M12 21V23M4.21997 4.21997L5.63997 5.63997M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.21997 19.78L5.63997 18.36M18.36 5.63997L19.78 4.21997M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
          stroke={props.color || "black"}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_3_459">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Sun;
