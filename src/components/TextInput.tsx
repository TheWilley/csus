import '../assets/fonts/JetBrainsMono-Regular.ttf';
import { InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn.ts';

type Props = { error?: boolean } & InputHTMLAttributes<HTMLInputElement>;

function TextInput({ ...props }: Props) {
  return (
    <input
      {...props}
      className={cn(
        'bg-white bg-opacity-[7%] text-lg text-white p-1 border-2 border-[#434343] placeholder:text-white placeholder:opacity-50 disabled:opacity-50 outline-none focus:bg-opacity-[9%]',
        props.className,
        props.error ? 'border-red-600' : ''
      )}
    />
  );
}

export default TextInput;
