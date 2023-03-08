import { SVGProps } from 'react';

const SendingIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      width="14px"
      height="14px"
      {...props}
   >
      <title>{'Đang gửi'}</title>
      <path
         clipRule="evenodd"
         d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-2 0A6 6 0 1 1 2 8a6 6 0 0 1 12 0z"
         fillRule="evenodd"
      />
   </svg>
);

export default SendingIcon;
