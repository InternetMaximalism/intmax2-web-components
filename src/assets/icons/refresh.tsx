import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Refresh = (props: Props) => {
  return (
    <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 4V10M1 10H7M1 10L5.64 5.64001C6.71475 4.56473 8.04437 3.77922 9.50481 3.35679C10.9652 2.93436 12.5089 2.88877 13.9917 3.22427C15.4745 3.55978 16.8482 4.26545 17.9845 5.27543C19.1209 6.28542 19.9828 7.5668 20.49 9.00001M23 20V14M23 14H17M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1113 10.0083 20.7758C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15"
        stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
};

export default Refresh;
