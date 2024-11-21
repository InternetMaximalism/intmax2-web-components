import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Medium = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_749_7342)">
        <path
          d="M20 9.85643C20 12.5059 19.556 14.655 19.0081 14.655C18.4602 14.655 18.0164 12.5064 18.0164 9.85643C18.0164 7.20643 18.4604 5.05789 19.0081 5.05789C19.5558 5.05789 20 7.20623 20 9.85643Z"
          fill="#4B5563"
        />
        <path
          d="M17.4689 9.85644C17.4689 12.8142 16.2062 15.2129 14.6486 15.2129C13.0909 15.2129 11.8282 12.8142 11.8282 9.85644C11.8282 6.89867 13.0907 4.49998 14.6484 4.49998C16.206 4.49998 17.4689 6.89791 17.4689 9.85644Z"
          fill="#4B5563"
        />
        <path
          d="M11.2812 9.85644C11.2812 12.9987 8.75579 15.546 5.6407 15.546C2.52561 15.546 0 12.9981 0 9.85644C0 6.71475 2.52542 4.16669 5.6407 4.16669C8.75598 4.16669 11.2812 6.71417 11.2812 9.85644Z"
          fill="#4B5563"
        />
      </g>
      <defs>
        <clipPath id="clip0_749_7342">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Medium;
