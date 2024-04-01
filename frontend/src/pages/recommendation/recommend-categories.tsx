import { useState } from 'react';
import RecommendationItem from './recommendation-Item';
import Dropbox from '../../shared/ui/dropbox/dropbox';

import Image from '../../assets/images/main3.jpg';
import { useNavigate } from 'react-router';
import { Cloth } from '../../entities/closet/closet-types';

const RecommendationCategories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('전체');
  // 하위 카테고리 추가 필요
  const categoryList = ['전체', '아우터', '상의', '하의', '드레스'];
  const cloth = { id: 2, image: Image, category: [], details: [], textures: [], part: '' };
  const [categoryResponseList, setCategoryResponseList] = useState<Cloth[]>([cloth, cloth, cloth, cloth]);

  // 카테고리 설정
  const handleSelectedCategory = (selectedItem: string) => {
    setCategory(selectedItem);
    handleGetCategoryList();
  };

  // 해당 category 에 대한 추천 결과 리스트를 조회
  const handleGetCategoryList = () => {
    category;
    setCategoryResponseList([]);
  };

  // 해당 아이템 코디 해 보기
  const handleClickMoveToCoordi = (selectedItem: Cloth) => {
    navigate(`/coordi/2/${selectedItem.id}`);
  };

  return (
    <>
      <Dropbox options={categoryList} onSelected={() => handleSelectedCategory}></Dropbox>

      <div className="flex">
        {categoryResponseList.map((item, index) => (
          <RecommendationItem key={index} item={item} onClickItem={() => handleClickMoveToCoordi(item)} />
        ))}
      </div>
    </>
  );
};

export default RecommendationCategories;
