import { useState } from 'react';
import RecommendationItem from './recommendation-Item';
import Dropbox from '../../shared/ui/dropbox/dropbox';

import { useNavigate } from 'react-router';
import { HadoopCloth } from '../../entities/analysis/analysis-types';
// import { useParams } from 'react-router';

const RecommendationColors = () => {
  // const { info } = useParams<{ id: string; image: string }>();
  const navigate = useNavigate();

  const [color, setColor] = useState<string>('전체');
  const colorList = ['전체', '빨강', '주황', '노랑', '초록', '파랑', '보라', '하양', '검정'];
  const [colorResponseList, setColorResponseList] = useState<HadoopCloth[]>([]);

  // 색상 설정
  const handleSelectedColor = (selectedItem: string) => {
    setColor(selectedItem);
    handleGetColorList();
  };

  // 해당 color 에 대한 추천 결과 리스트를 조회
  const handleGetColorList = () => {
    color;
    setColorResponseList([]);
  };

  // 해당 아이템 코디 해 보기
  const handleClickMoveToCoordi = (selectedItem: HadoopCloth) => {
    navigate(`/coordi/2/${selectedItem.id}`);
  };

  return (
    <>
      <Dropbox options={colorList} onSelected={handleSelectedColor}></Dropbox>

      <div className="flex">
        {colorResponseList.map((item, index) => (
          <RecommendationItem key={index} item={item} onClickItem={() => handleClickMoveToCoordi(item)} />
        ))}
      </div>
    </>
  );
};

export default RecommendationColors;
