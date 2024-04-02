import { HadoopCloth } from '../../entities/analysis/analysis-types';
import Button from '../../shared/ui/button/button';

interface RecommendationItemProps {
  item: HadoopCloth;
  onClickItem(item: HadoopCloth): void;
}

const RecommendationItem = (props: RecommendationItemProps) => {
  return (
    <div>
      <img className="w-64 h-64" src={props.item.image} alt="" />
      <Button className="w-64 h-16" onClick={() => props.onClickItem(props.item)} value="코디 해 보기" />
    </div>
  );
};

export default RecommendationItem;
