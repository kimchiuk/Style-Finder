import { useState } from 'react';
import RecommendationItem from './recommendation-Item';
import Dropbox from '../../shared/ui/dropbox/dropbox';

import { useNavigate } from 'react-router';
import { HadoopCloth } from '../../entities/analysis/analysis-types';

const RecommendationTastes = () => {
  const navigate = useNavigate();
  const [taste, setTaste] = useState<string>('전체');
  const tasteList = [
    '전체',
    '레트로',
    '로맨틱',
    '리조트',
    '매니시',
    '모던',
    '밀리터리',
    '섹시',
    '소피스트케이티드',
    '스트리트',
    '스포티',
    '아방가르드',
    '오리엔탈',
    '웨스턴',
    '젠더리스',
    '컨트리',
    '클래식',
    '키치',
    '톰보이',
    '펑크',
    '페미닌',
    '프레피',
    '히피',
    '힙합',
  ];

  const [tasteResponseList, setTasteResponseList] = useState<HadoopCloth[]>([]);

  // 취향 설정
  const handleSelectedTaste = (selectedItem: string) => {
    setTaste(selectedItem);
    handleGetTasteList();
  };

  // 해당 taste 에 대한 추천 결과 리스트를 조회
  const handleGetTasteList = () => {
    taste;
    setTasteResponseList([]);
  };

  // 해당 아이템 코디 해 보기
  const handleClickMoveToCoordi = (selectedItem: HadoopCloth) => {
    navigate(`/coordi/2/${selectedItem.id}`);
  };

  return (
    <>
      <Dropbox options={tasteList} onSelected={() => handleSelectedTaste}></Dropbox>

      <div className="flex">
        {tasteResponseList.map((item, index) => (
          <RecommendationItem key={index} item={item} onClickItem={() => handleClickMoveToCoordi(item)} />
        ))}
      </div>
    </>
  );
};

export default RecommendationTastes;
