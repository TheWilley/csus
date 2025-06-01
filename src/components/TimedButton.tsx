import { useState } from 'react';
import Button from './Button.tsx';

type Props = {
  callback: () => void;
  time: number;
  text: string;
  timedText: string;
};

export function TimedButton(props: Props) {
  const [timedText, setTimedText] = useState(props.text);

  // Sets state to "copied" for 2 seconds and then back to "copy"
  const copy = () => {
    props.callback();
    setTimedText(props.timedText);
    setTimeout(() => {
      setTimedText(props.text);
    }, props.time);
  };

  return <Button onClick={copy}>{timedText}</Button>;
}
