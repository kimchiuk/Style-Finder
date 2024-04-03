import My from '../my/my';
import MyCloset from './my-closet';

const Closet = () => {
  return (
    <div className="px-16 mx-auto">
      <div className="justify-around">
        <div>
          <My></My>
        </div>
        <div className="pt-2 mt-2">
          <MyCloset></MyCloset>
        </div>
      </div>
    </div>
  );
};

export default Closet;
