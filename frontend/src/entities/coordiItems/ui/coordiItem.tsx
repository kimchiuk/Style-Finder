import Button from '../../../shared/ui/button/Button';
import { Cloth } from '../../../shared/types/coordi';

interface CoordiItemProps extends Cloth {
  onClick(): void;
}

const CoordiItem = (props: CoordiItemProps) => {
  return (
    <div>
      <img className="p-2 m-2 w-36 h-36 bg-gray-200 rounded-lg" src={props.image} alt="" style={{ borderRadius: '20px' }} />
      <div className='flex justify-center'>
      <Button onClick={props.onClick} value={props.value} />
      </div>
    </div>
  );
};

export default CoordiItem;
