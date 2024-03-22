import CoordiItem from './coordiItem';
import { Clothes } from '../../../shared/types/coordi';

interface CoordiItemsProps extends Clothes {
  onClick(): void;
}

const CoordiItems = (props: CoordiItemsProps) => {
  return (
    <div className="flex">
      {props.clothes.map((item) => (
        <CoordiItem id={item.id} image={item.image} value={item.value} link={item.link} onClick={props.onClick} />
      ))}
    </div>
  );
};

export default CoordiItems;
