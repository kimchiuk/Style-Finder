import { ButtonHTMLAttributes } from 'react';

interface SearchBarProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div>
      <input className="p-2 m-2 bg-gray-200 rounded-lg" type="text" />
      <button className="p-2 m-2 bg-gray-200 rounded-lg" value={props.value} />
    </div>
  );
};

export default SearchBar;
