import { useState } from 'react';
import { RecommendCloth } from '../../entities/recommend/recommend-types';
import Button from '../../shared/ui/button/button';

interface RecommendationItemProps {
  item: RecommendCloth;
  onClickItem(item: RecommendCloth): void;
}

const RecommendationItem = (props: RecommendationItemProps) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Hover 로 상세 정보 확인
  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  return (
    <div className="my-2">
      <div className="relative">
        <img className="w-64 h-64 m-2 rounded-md" src={`data:image/png;base64,${props.item.image}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
        {isOverlayVisible && (
          <div className="absolute inset-0 w-64 h-64 ml-2 bg-black rounded-md opacity-90">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              {props.item.part && <p>착용 부위: {props.item.part}</p>}
              {props.item.category && <p>카테고리: {props.item.category}</p>}
              {props.item.style && <p>스타일: {props.item.style}</p>}
              {props.item.color && <p>색상: {props.item.color}</p>}
            </div>
          </div>
        )}
      </div>
      <div className="flex m-2">
        <Button className="w-40 h-16" value="코디 해 보기" onClick={() => props.onClickItem(props.item)} />
      </div>
    </div>
  );
};

export default RecommendationItem;
