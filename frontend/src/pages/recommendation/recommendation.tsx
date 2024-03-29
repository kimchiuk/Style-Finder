// import useLoginStore from '../../shared/store/useLoginStore';
// import useUserStore from '../../shared/store/useUserStore';

import My from '../my/my';

// import { Link } from 'react-router-dom';

const Recommendation = () => {
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
          <div>추천</div>

          <My></My>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Recommendation;
