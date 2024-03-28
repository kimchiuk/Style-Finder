import { TextareaHTMLAttributes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <div>
      <label className="p-2 m-2 ">{props.label}</label>
      <TextareaAutosize className="p-2 m-2 bg-gray-200 rounded-lg" cacheMeasurements placeholder="" value={props.value} />
    </div>
  );
};

export default TextArea;
