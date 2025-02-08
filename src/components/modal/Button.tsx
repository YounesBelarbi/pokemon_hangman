import { forwardRef } from "react";

interface ButtonProps {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // focusRef?: React.RefObject<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, handleClick }, focusRef) => {
    return (
      <button
        ref={focusRef}
        onClick={handleClick}
        className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-emerald-500 bg-emerald-50  hover:text-white hover:bg-emerald-600 border border-emerald-100 hover:border-emerald-600  focus:bg-emerald-600 focus:text-white focus:border-emerald-600 outline-none"
      >
        <span>{text}</span>
      </button>
    );
  }
);

export default Button;
