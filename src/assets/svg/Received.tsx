import { SVGProps } from 'react';

const ReceivedIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
   return (
      <svg
         role="img"
         viewBox="0 0 16 16"
         xmlns="http://www.w3.org/2000/svg"
         className="sent-status"
         width="14px"
         height="14px"
         {...props}
      >
         <title>Đã chuyển</title>
         <path
            clipRule="evenodd"
            d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.774-10.407a1 1 0 00-1.73-1.004L7.417 9.114a.15.15 0 01-.236.031L5.798 7.762a1 1 0 00-1.414 1.414l2.44 2.44a1 1 0 001.572-.205l3.378-5.818z"
            fillRule="evenodd"
         />
      </svg>
   );
};

export default ReceivedIcon;
