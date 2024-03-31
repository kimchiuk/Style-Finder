import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Button from '../button/button';

interface SearchBarProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchBarDiv = styled.div`
  display: flex;
`;

const InputElement = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #e5e7eb; /* bg-gray-200 */
  border-radius: 0.375rem; /* rounded-lg */
  border: none;
`;

const ButtonElement = styled(Button)`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #e5e7eb; /* bg-gray-200 */
  border-radius: 0.375rem; /* rounded-lg */
  border: none;
  cursor: pointer;
`;

const SearchBar = (props: SearchBarProps) => {
  return (
    <SearchBarDiv>
      <InputElement type="text" />
      <ButtonElement value={props.value} />
    </SearchBarDiv>
  );
};

export default SearchBar;
