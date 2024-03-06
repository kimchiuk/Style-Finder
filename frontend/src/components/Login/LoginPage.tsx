import useLoginStore from '../../store/login';
import useUserStore from '../../store/user'

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
      {!loginStore.isLogin? (
        // 로그아웃 상태
        <div>
          로그인 페이지
          <Link to="/">
            <div>홈으로 돌아가기</div>
          </Link>
        </div>
      ) : (
        // 로그인 상태 
        <div>
          로그인 페이지
          id : {userStore.id}
        </div>
      )}
    </div>
  )
}

export default LoginPage
