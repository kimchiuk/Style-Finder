interface SearchBarProps {
  contents: string;
  onClick(): void;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div>
      <input className="p-2 m-2 bg-gray-200 rounded-lg" type="text" />
      <button className="p-2 m-2 bg-gray-200 rounded-lg" onClick={props.onClick}>
        <span>{props.contents}</span>
      </button>
    </div>
  );
};

export default SearchBar;
