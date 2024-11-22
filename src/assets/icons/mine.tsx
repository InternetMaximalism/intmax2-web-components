import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Mine = (props: Props) => {
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
        d="M12 1L22 12L12 23L2 12L12 1Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2.5 12H21.5" stroke="black" strokeWidth="1.5" />
      <path d="M12 1L7.5 12L12 23" stroke="black" strokeWidth="1.5" />
      <path d="M12 1L16.5 12L12 23" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

export default Mine;
