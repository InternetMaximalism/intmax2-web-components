import { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
}

const Loader = (props: Props) => {
  return (
    <div className="flex justify-center">
      <svg className="animate-spin" width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2V6M12 18V22M4.92999 4.92999L7.75999 7.75999M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.92999 19.07L7.75999 16.24M16.24 7.75999L19.07 4.92999"
          stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default Loader;
