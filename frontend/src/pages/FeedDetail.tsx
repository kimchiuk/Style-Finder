import Navbar from '../widgets/header/Navbar';
import Footer from '../widgets/Footer/Footer';
import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

const FeedDetail = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  return (
    <>
    <Navbar></Navbar>
    <div>
      {!loginStore.isLogin ? (
        // 로그아웃 상태
        <div>
          <div className='flex justify-center'>ITEMS</div>
          <div className='flex justify-center'>
            <div className="hero max-h-screen-xl max-w-screen-xl bg-base-200 flex flex-col">
              <div className="hero-content flex-col lg:flex-row">
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
              </div>
              <div>
                <div>feedTitle</div>
                <div>최초등록자 : userid</div>
                <div>예상 가격 : 00원</div>
                <button className="btn btn-outline">피팅 해보기</button>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className="hero max-h-screen-xl max-w-screen-xl bg-base-200 flex flex-grow items-start mt-5 ">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className='flex justify-between flex-grow'>
                <div>
                  <div className='ml-3'>userid</div>
                  <div className='ml-3'>feedcontent</div>
                </div>
                <div className='mr-3 flex justify-end'>feedCreatedDate</div>
              </div>
            </div>
          </div>
          <div>Comments</div>
          <div className='flex justify-center items-center'>
            <div className="hero max-h-screen-xl max-w-screen-xl bg-base-200 flex flex-grow items-start mt-5 ">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className='flex justify-between flex-grow'>
                <div>
                  <div className='ml-3'>userid</div>
                  <div className='ml-3'>feedcontent</div>
                </div>
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
    <Footer></Footer>
      </>
  );
};

export default FeedDetail;
