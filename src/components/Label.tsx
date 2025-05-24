import '../assets/fonts/JetBrainsMono-Regular.ttf';
import { InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn.ts';

type Props = { text: string } & InputHTMLAttributes<HTMLLabelElement>;

function Label({ ...props }: Props) {
  return (
    <label {...props} className={cn('text-md text-white', props.className)}>
      {props.text}
    </label>
  );
}

export default Label;
