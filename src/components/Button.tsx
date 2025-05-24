import '../assets/fonts/JetBrainsMono-Regular.ttf';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

function Button({ text, onClick, disabled, className }: Props) {
  return (
    <button
      className={`bg-white bg-opacity-[7%] text-lg text-white p-3 border-2 border-[#434343] hover:bg-opacity-[9%] disabled:opacity-50 disabled:hover:bg-opacity-[7%] ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
