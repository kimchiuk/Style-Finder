import Navbar from '../../widgets/nav/navbar';

import useLoginStore from '../../shared/store/useLoginStore';

import { Link } from 'react-router-dom';

const Coordi = () => {
  const loginStore = useLoginStore();

  return (
    <>
      <Navbar></Navbar>
      <div>
        {!loginStore.isLogin ? (
          // 로그아웃 상태
          <div>
            <div>코디</div>
            <Link to="/">
              <div>홈으로 돌아가기</div>
            </Link>
          </div>
        ) : (
          // 로그인 상태
          <div>
            <div>코디</div>
            <div className=""></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Coordi;
