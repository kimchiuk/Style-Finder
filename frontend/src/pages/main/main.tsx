import Navbar from '../../widgets/nav/navbar';

import useLoginStore from '../../shared/store/useLoginStore';
import useUserStore from '../../shared/store/useUserStore';

const Main = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  return (
    <>
      <Navbar></Navbar>
      <div className="">
        {!loginStore.isLogin ? (
          // 로그아웃 상태
          <div className="">메인 페이지</div>
        ) : (
          // 로그인 상태
          <div className="">
            메인 페이지
            <br />
            id: {userStore.userId}
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
