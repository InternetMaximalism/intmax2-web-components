import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowUpRight = (props: Props) => (
  <svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.83334 14.1667L14.1667 5.83333M14.1667 5.83333H5.83334M14.1667 5.83333V14.1667"
      stroke={props.color || "#4B5563"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowUpRight ;
