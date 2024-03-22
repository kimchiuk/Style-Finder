import Navbar from '../widgets/header/Navbar';

import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

import { Link } from 'react-router-dom';

import CoordiForm from '../entities/coordiItems/ui/coordiForm';
import CoordiList from '../entities/coordiItems/ui/coordiList';
import CoordiRecommend from '../entities/coordiItems/ui/coordiRecommend';
import AI from '../assets/images/aimodel.png';

const Coordi = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  // 더미 데이터
  const coordiItemData = { id: 0, image: AI, value: 'image0', link: 'image0' };
  const feedItemData = { id: 0, title: 'title', content: 'content', date: 'date', writer: 1 };
  const coordiScreenData = {
    id: 0,
    color: 'red',
    hair: { id: 0, image: AI, value: 'image0', link: 'image0' },
    top: { id: 1, image: AI, value: 'image1', link: 'image1' },
    bottom: { id: 2, image: AI, value: 'image2', link: 'image2' },
    shoes: { id: 3, image: AI, value: 'image3', link: 'image3' },
  };
  const coordiItemsData = { clothes: [coordiItemData, coordiItemData, coordiItemData, coordiItemData] };
  const coordiListData = { coordi: coordiScreenData, clothesList: [coordiItemsData, coordiItemsData, coordiItemsData, coordiItemsData] };
  const FeedItemFormData = { coordi: coordiScreenData, feed: feedItemData };
  const CoordiRecommendData = { keyword: ['0', '1', '2', '3'] };

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
            <div>id: {userStore.id}</div>
            <div className="flex">
              <div>
                <CoordiForm {...FeedItemFormData}></CoordiForm>
                <CoordiRecommend {...CoordiRecommendData}></CoordiRecommend>
              </div>
              <div>
                <CoordiList {...coordiListData}></CoordiList>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Coordi;
