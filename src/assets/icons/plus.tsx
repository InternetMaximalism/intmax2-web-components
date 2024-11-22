import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Plus = (props: Props) => {
  return (
    <svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke={props.color || "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export default Plus;
