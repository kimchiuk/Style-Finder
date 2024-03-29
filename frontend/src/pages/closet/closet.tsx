// import useLoginStore from '../../shared/store/useLoginStore';
// import useUserStore from '../../shared/store/useUserStore';

// import { Link } from 'react-router-dom';
import MyCloset from './myCloset';
import MyClosetAnalysis from './myClosetAnalysis';

const Closet = () => {
  // const loginStore = useLoginStore();
  // const userStore = useUserStore();

  return (
    <>
      <div>
        {/* {!loginStore.isLogin ? (
          // 로그아웃 상태
          <div>
            <div>추천</div>
            <Link to="/">
              <div>홈으로 돌아가기</div>
            </Link>
          </div>
        ) : (
          // 로그인 상태 */}
        <div>
          <div>취향 분석</div>
          <MyClosetAnalysis></MyClosetAnalysis>
          <div>내 옷장</div>
          <MyCloset></MyCloset>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Closet;
