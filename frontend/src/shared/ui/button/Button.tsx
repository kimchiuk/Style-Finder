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

// 사용법: 사용하고자 하는 페이지에서 import 후 하단 코드 형태로 작성
// <Button value="Hello World" onClick={() => console.log("Button Clicked")}>
//   Button
// </Button>
