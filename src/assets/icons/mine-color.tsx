import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const MineColor = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.555 0.328747C10.4128 0.172392 10.2113 0.083252 10 0.083252C9.78869 0.083252 9.58719 0.172392 9.44505 0.328747L1.11171 9.49541C0.851652 9.78148 0.851652 10.2184 1.11171 10.5044L9.44505 19.6711C9.58719 19.8274 9.78869 19.9166 10 19.9166C10.2113 19.9166 10.4128 19.8274 10.555 19.6711L18.8883 10.5044C19.1483 10.2184 19.1483 9.78148 18.8883 9.49541L10.555 0.328747ZM3.36208 10.7499L7.69736 15.5187L5.74649 10.7499H3.36208ZM10 17.1858L12.6328 10.7499H7.36715L10 17.1858ZM12.3026 15.5187L16.6379 10.7499H14.2535L12.3026 15.5187ZM14.2535 9.24992H16.6379L12.3026 4.48111L14.2535 9.24992ZM10 2.81406L7.36715 9.24992H12.6329L10 2.81406ZM3.36208 9.24992L7.69736 4.48111L5.74649 9.24992H3.36208ZM21.5 0.249919C21.9142 0.249919 22.25 0.585705 22.25 0.999919V2.24992H23C23.4142 2.24992 23.75 2.58571 23.75 2.99992C23.75 3.41413 23.4142 3.74992 23 3.74992H22.25V4.99992C22.25 5.41413 21.9142 5.74992 21.5 5.74992C21.0858 5.74992 20.75 5.41413 20.75 4.99992V3.74992H20C19.5858 3.74992 19.25 3.41413 19.25 2.99992C19.25 2.58571 19.5858 2.24992 20 2.24992H20.75V0.999919C20.75 0.585705 21.0858 0.249919 21.5 0.249919ZM2.5 18.2499C2.91421 18.2499 3.25 18.5857 3.25 18.9999V20.2499H4C4.41421 20.2499 4.75 20.5857 4.75 20.9999C4.75 21.4141 4.41421 21.7499 4 21.7499H3.25V22.9999C3.25 23.4141 2.91421 23.7499 2.5 23.7499C2.08579 23.7499 1.75 23.4141 1.75 22.9999V21.7499H1C0.585786 21.7499 0.25 21.4141 0.25 20.9999C0.25 20.5857 0.585786 20.2499 1 20.2499H1.75V18.9999C1.75 18.5857 2.08579 18.2499 2.5 18.2499Z"
        fill="url(#paint0_linear_773_440)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_773_440"
          x1="0.25"
          y1="0.083252"
          x2="23.75"
          y2="0.0832448"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D972C5" />
          <stop offset="0.34375" stopColor="#DBC44E" />
          <stop offset="0.6875" stopColor="#5CCCB6" />
          <stop offset="1" stopColor="#49A1E6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MineColor;