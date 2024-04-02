// import useLoginStore from '../../shared/store/useLoginStore';
// import useUserStore from '../../shared/store/useUserStore';

// import { Link } from 'react-router-dom';

import RecommendTastes from './recommend-tastes';
import RecommendColors from './recommend-colors';
import RecommendCategories from './recommend-categories';
import Keywords from '../../features/analysis/kewords';

const Recommendation = () => {
  // const loginStore = useLoginStore();
  // const userStore = useUserStore();

  // // 아이템 선택 시 해당 아이템으로 코디 해 보기
  // const handleClickMoveToCoordi = () => {};

  return (
    <>
      <div className='text-lg pt-4'>당신의 취향은?</div>
      <div className="content-center">
        <Keywords />
      </div>
      <div className='text-lg'>취향별 추천</div>
      <RecommendTastes />

      <div className='text-lg'>카테고리별 추천</div>
      <RecommendCategories />

      <div className='text-lg'>색상별 추천</div>
      <RecommendColors />
    </>
  );
};

export default Recommendation;
