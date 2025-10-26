import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn.ts';

type Props = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'bg-white bg-opacity-[7%] text-lg text-white p-3 border-2 border-[#434343] hover:bg-opacity-[9%] disabled:opacity-50 disabled:hover:bg-opacity-[7%]',
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
