import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowUpRightBlueSm = (props: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.6665 11.3333L11.3332 4.66666M11.3332 4.66666H4.6665M11.3332 4.66666V11.3333"
        stroke="#458FB9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpRightBlueSm;
