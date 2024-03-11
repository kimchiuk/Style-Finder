import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

// import useAxios from '../../hooks/useAxios';
// import api from '../../utils/axios';

import { Link } from 'react-router-dom';

const LoginPage = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  // login axios 결과 값 받는 부분
  // const result = useAxios(api.getTest1, () => ({}));
  // console.log(result.response);

  return (
    <div>
      {!loginStore.isLogin ? (
        // 로그아웃 상태
        <div>
          <div>로그인</div>
          <Link to="/">
            <div>홈으로 돌아가기</div>
          </Link>
        </div>
      ) : (
        // 로그인 상태
        <div>
          <div>로그인</div>
          <div> 콘텐츠 </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
