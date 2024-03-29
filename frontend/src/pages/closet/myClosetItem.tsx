interface MyClosetItemProps {
  image: string;
  label: string;
}

const MyClosetItem = (props: MyClosetItemProps) => {
  return (
    <>
      <div>
        <img src={props.image}></img>
        <label>{props.label}</label>
      </div>
    </>
  );
};

export default MyClosetItem;
