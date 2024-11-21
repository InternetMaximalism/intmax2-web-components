import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ShutDown = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.2998 5.53343C16.3484 6.58242 17.0625 7.9188 17.3517 9.37359C17.6409 10.8284 17.4922 12.3363 16.9245 13.7066C16.3567 15.0769 15.3954 16.2481 14.1621 17.0721C12.9288 17.8961 11.4789 18.3359 9.99561 18.3359C8.51235 18.3359 7.0624 17.8961 5.82909 17.0721C4.59577 16.2481 3.63448 15.0769 3.06675 13.7066C2.49902 12.3363 2.35035 10.8284 2.63954 9.37359C2.92873 7.9188 3.64279 6.58242 4.69144 5.53343M9.99978 1.66675V10.0001"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShutDown;
