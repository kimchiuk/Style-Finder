interface InputBarProps {
  label: string;
  value: string;
}

const InputBar = (props: InputBarProps) => {
  return (
    <div>
      <label className="p-2 m-2 bg-gray-200 rounded-lg">{props.label}</label>
      <input className="p-2 m-2 bg-gray-200 rounded-lg" type="text" value={props.value} />
    </div>
  );
};

export default InputBar;
