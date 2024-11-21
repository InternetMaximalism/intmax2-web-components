
import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const WalletIcon = (props: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 10.2V4.9C1.5 3.57 2.57 2.5 3.9 2.5H17.78C19.11 2.5 20.18 3.57 20.18 4.9" stroke={props.color}
            strokeWidth="1.5" strokeMiterlimit="10" />
      <path
        d="M22.39 10.6799V7.6499C22.39 6.2699 21.27 5.1499 19.89 5.1499H4C2.62 5.1499 1.5 6.2699 1.5 7.6499V18.6299C1.5 20.0099 2.62 21.1299 4 21.1299H19.89C21.27 21.1299 22.39 20.0099 22.39 18.6299V15.7299"
        stroke={props.color} strokeWidth="1.5" strokeMiterlimit="10" />
      <path
        d="M17.2199 10.6799C15.8199 10.6799 14.6899 11.8099 14.6899 13.2099C14.6899 14.6099 15.8199 15.7399 17.2199 15.7399H22.3799V10.6899H17.2199V10.6799Z"
        stroke={props.color} strokeWidth="1.5" strokeMiterlimit="10" />
    </svg>
  );
};

export default WalletIcon;
