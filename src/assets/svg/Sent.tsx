import { SVGProps } from 'react';

const SentIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
   return (
      <svg
         role="img"
         viewBox="0 0 16 16"
         xmlns="http://www.w3.org/2000/svg"
         width="14px"
         height="14px"
         className="sent-status"
         {...props}
      >
         <title>Đã gửi</title>
         <path d="M11.592 5.775a1 1 0 00-1.73-1.004L7.446 8.932a.15.15 0 01-.236.031l-1.23-1.23a1 1 0 10-1.414 1.414l2.287 2.287a1 1 0 001.572-.205l3.167-5.454z" />
         <path
            clipRule="evenodd"
            d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-2 0A6 6 0 112 8a6 6 0 0112 0z"
            fillRule="evenodd"
         />
      </svg>
   );
};

export default SentIcon;
