import { useState } from 'react';
import RecommendationItem from './recommendation-Item';
import Dropbox from '../../shared/ui/dropbox/dropbox';

import { useNavigate } from 'react-router';
import { RecommendCloth } from '../../entities/recommend/recommend-types';
import api from '../../entities/analysis/analysis-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';
import useClothStore from '../../shared/store/use-cloth-store';
// import { useParams } from 'react-router';

const RecommendationColors = () => {
  // const { info } = useParams<{ id: string; image: string }>();
  const navigate = useNavigate();
  const loginStore = useLoginStore();
  const clothStore = useClothStore();

  const [color, setColor] = useState<string>('');
  const colorList = [
    '',
    '화이트',
    '그레이',
    '베이지',
    '라벤더',
    '오렌지',
    '블루',
    '와인',
    '블랙',
    '레드',
    '브라운',
    '스카이블루',
    '옐로우',
    '핑크',
    '실버',
    '네온',
    '퍼플',
    '카키',
    '민트',
    '그린',
    '골드',
    '네이비',
  ];
  const [colorResponseList, setColorResponseList] = useState<RecommendCloth[]>([]);

  // 색상 설정
  const handleSelectedColor = (selectedItem: string) => {
    setColor(selectedItem);
    handleGetColorList();
  };

  // 해당 color 에 대한 추천 결과 리스트를 조회
  const handleGetColorList = () => {
    api
      .recommendByColor(color)
      .then((response) => {
        const data = response.data;

        setColorResponseList(data);
        console.log(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  // 해당 아이템 코디 해 보기
  const handleClickMoveToCoordi = (selectedItem: RecommendCloth) => {
    clothStore.createCloth(selectedItem);
    navigate(`/coordi/0}`);
  };

  return (
    <div className="py-4 my-4">
      <div className="flex justify-between">
        <div className="text-lg">색상별 추천</div>
        <Dropbox options={colorList} onSelected={handleSelectedColor}></Dropbox>
      </div>
      {colorResponseList.length == 0 ? (
        <div className="mx-4 my-20">
          <div className="my-20 text-center">검색된 추천 리스트가 없습니다!</div>
        </div>
      ) : (
        <div className="mx-4 my-2">
          <div className="flex">
            {colorResponseList.map((item, index) => (
              <RecommendationItem key={index} item={item} onClickItem={() => handleClickMoveToCoordi(item)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationColors;
