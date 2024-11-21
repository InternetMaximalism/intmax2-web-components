import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const ArrowDownLeft = (props: Props) => (
  <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L7 17M7 17H17M7 17V7" stroke={props.color || "black"} strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" />
  </svg>
);

export default ArrowDownLeft;
