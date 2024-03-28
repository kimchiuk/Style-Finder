import { InputHTMLAttributes } from 'react';

interface InputBarProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: InputBarProps) => {
  return (
    <div>
      <label className="p-2 m-2 ">{props.label}</label>
      <input className="p-2 m-2 bg-gray-200 rounded-lg" type="text" value={props.value} />
    </div>
  );
};

export default Input;
