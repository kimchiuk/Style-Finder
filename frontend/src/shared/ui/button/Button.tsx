import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonElement = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #aaaaaa;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const Button = (props: ButtonProps) => {
  return <ButtonElement {...props}>{props.value}</ButtonElement>;
};

export default Button;
