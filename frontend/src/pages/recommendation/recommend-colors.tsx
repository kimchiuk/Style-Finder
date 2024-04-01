import { useState } from 'react';
import RecommendationItem from './recommendation-Item';
import Dropbox from '../../shared/ui/dropbox/dropbox';

import Image from '../../assets/images/main2.png';
// import { useParams } from 'react-router';

interface ColorResponse {
  id: string;
  image: string;
}

const RecommendationColors = () => {
  // const { info } = useParams<{ id: string; image: string }>();

  const [color, setColor] = useState<string>('전체');
  const colorList = ['전체', '빨강', '주황', '노랑', '초록', '파랑', '보라', '하양', '검정'];
  const [colorResponseList, setColorResponseList] = useState<ColorResponse[]>([{ id: 'id1', image: Image }]);

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
  const handleClickMoveToCoordi = () => {};

  return (
    <>
      <Dropbox options={colorList} onSelected={handleSelectedColor}></Dropbox>

      {colorResponseList.map((item, index) => (
        <RecommendationItem key={index} id={item.id} image={item.image} handleClickMoveToCoordi={handleClickMoveToCoordi} />
      ))}
    </>
  );
};

export default RecommendationColors;
