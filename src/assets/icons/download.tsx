import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const Download = (props: Props) => {
  return (
    <svg width={props.width || 20} height={props.height || 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 10L12 15M12 15L17 10M12 15L12 3M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke={props.color || "#4B5563"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
};

export default Download;
