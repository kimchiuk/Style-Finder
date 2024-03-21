import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

const FeedDetail = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  return (
    <div>
      {!loginStore.isLogin ? (
        // 로그아웃 상태
        <div>
          <div className='flex justify-center'>ITEMS</div>
          <div className='flex justify-center'>
            <div className="hero min-h-screen max-w-screen-xl bg-base-200 flex flex-col">
              <div className="hero-content flex-col lg:flex-row">
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
              </div>
              <div>
                <div>코디이름</div>
                <div>최초등록자 : 유저이름</div>
                <div>예상 가격 : 00원</div>
                <button className="btn btn-outline">피팅 해보기</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 로그인 상태
        <div>
          <div>피팅</div>
        </div>
      )}
    </div>
  );
};

export default FeedDetail;
