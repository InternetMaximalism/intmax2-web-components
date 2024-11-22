import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const SendHorizontal = (props: Props) => {
  return (
    <svg className={props.className} width={props.width || "16"} height={props.height || "16"} viewBox="0 0 16 16"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33333 8L2 14L14 8L2 2L3.33333 8ZM3.33333 8L8.66667 8" stroke={props.color || "#4B5563"} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default SendHorizontal;



