import { Cloth } from '../../entities/closet/closet-types';
import Button from '../../shared/ui/button/button';

interface RecommendationItemProps {
  item: Cloth;
  onClickItem(item: Cloth): void;
}

const RecommendationItem = (props: RecommendationItemProps) => {
  return (
    <div>
      <img style={{ width: '200px', height: '200px' }} src={props.item.image} alt="" />
      <Button style={{ width: '200px', height: '50px' }} onClick={() => props.onClickItem(props.item)} value="코디 해 보기" />
    </div>
  );
};

export default RecommendationItem;
