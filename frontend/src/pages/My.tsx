import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

import { Link } from 'react-router-dom';

const My = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  return (
    <div>
      {!loginStore.isLogin ? (
        // 로그아웃 상태
        <div>
          <div>내 옷장</div>
          <Link to="/">
            <div>홈으로 돌아가기</div>
          </Link>
        </div>
      ) : (
        // 로그인 상태
        <div>
          <div>내 옷장</div>
          <div>id: {userStore.id}</div>
        </div>
      )}
    </div>
  );
};

export default My;
