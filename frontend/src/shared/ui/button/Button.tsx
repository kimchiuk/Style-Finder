import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  return (
    <>
      <button className="p-2 m-2 bg-gray-200 rounded-lg" {...props}>
        {props.value}
      </button>
    </>
  );
};

export default Button;
