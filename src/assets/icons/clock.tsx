import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const Clock = (props: Props) => {
  return (
    <svg width={props.width || 16} height={props.height || 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_709_7300)">
        <path
          d="M8.00016 3.99967V7.99967L10.6668 9.33301M8.00016 1.33301C6.23205 1.33301 4.53636 2.03539 3.28612 3.28563C2.03588 4.53587 1.3335 6.23156 1.3335 7.99967C1.3335 9.76778 2.03588 11.4635 3.28612 12.7137C4.53636 13.964 6.23205 14.6663 8.00016 14.6663C9.76827 14.6663 11.464 13.964 12.7142 12.7137C13.9645 11.4635 14.6668 9.76778 14.6668 7.99967C14.6668 6.23156 13.9645 4.53587 12.7142 3.28563C11.464 2.03539 9.76827 1.33301 8.00016 1.33301Z"
          stroke={props.color || "#4B5563"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_709_7300">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Clock;



