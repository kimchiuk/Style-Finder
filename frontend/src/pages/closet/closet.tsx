import My from '../my/my';
import MyCloset from './my-closet';

const Closet = () => {
  return (
    <div className="mx-auto px-36">
      <div className="justify-around">
        <My></My>
        <MyCloset></MyCloset>
      </div>
    </div>
  );
};

export default Closet;
