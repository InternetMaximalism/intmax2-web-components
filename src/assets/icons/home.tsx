import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Home = (props: Props) => {
  return (
    <svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.4142 10.4142L13.4142 2.41421C12.6332 1.63317 11.3668 1.63316 10.5858 2.41421L2.58579 10.4142C2.21071 10.7893 2 11.298 2 11.8284V20C2 21.1046 2.89543 22 4 22H7C8.10457 22 9 21.1046 9 20V15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15V20C15 21.1046 15.8954 22 17 22H20C21.1046 22 22 21.1046 22 20V11.8284C22 11.298 21.7893 10.7893 21.4142 10.4142Z"
        stroke="black" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

export default Home;
