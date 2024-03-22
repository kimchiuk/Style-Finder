import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps {
  label: string;
  value: string;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <div>
      <label className="p-2 m-2 bg-gray-200 rounded-lg">{props.label}</label>
      <TextareaAutosize className="p-2 m-2 bg-gray-200 rounded-lg" cacheMeasurements placeholder="" value={props.value} />
    </div>
  );
};

export default TextArea;
