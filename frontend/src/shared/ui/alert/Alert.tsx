interface AlertProps {
  message: string;
  onClickOK(): void;
  onClickCancel(): void;
}

const Alert = (props: AlertProps) => {
  return (
    <div>
      <h2>Alert</h2>
      <div className="p-2 m-2 bg-gray-200 rounded-lg">{props.message}</div>
      <div>
        <button className="p-2 m-2 bg-gray-200 rounded-lg" onClick={props.onClickCancel}>
          cancel
        </button>
        <button className="p-2 m-2 bg-gray-200 rounded-lg" onClick={props.onClickOK}>
          ok
        </button>
      </div>
    </div>
  );
};

export default Alert;
