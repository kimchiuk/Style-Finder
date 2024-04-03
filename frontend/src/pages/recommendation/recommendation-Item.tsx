import { HadoopCloth } from '../../entities/analysis/analysis-types';
import Button from '../../shared/ui/button/button';

interface RecommendationItemProps {
  item: HadoopCloth;
  onClickItem(item: HadoopCloth): void;
}

const RecommendationItem = (props: RecommendationItemProps) => {
  return (
    <>
      <div className="mx-0 my-2">
        <img className="w-64 h-64 m-2 rounded-md" src={`data:image/png;base64,${props.item.image}`}></img>
        <div className="flex m-2">
          <Button className="w-40 h-16" value="코디 해 보기" onClick={() => props.onClickItem(props.item)} />
        </div>
      </div>
    </>
  );
};

export default RecommendationItem;
