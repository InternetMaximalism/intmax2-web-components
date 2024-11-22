import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const Monitor = (props: Props) => {
  return (
    <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 21H16M12 17V21M4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3Z"
        stroke={props.color || "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Monitor;



