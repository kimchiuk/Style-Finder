import Navbar from '../../widgets/nav/navbar';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link import
import './feed.css';
import api from '../../entities/feed/feed-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/useLoginStore';

const Feed = () => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  const [isOverlayVisible, setIsOverlayVisible] = useState('0');
  const [ModalOpen, setModalOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);

  const modalBackground = useRef(null);

  const handleMouseEnter = (feedId: string) => {
    setIsOverlayVisible(feedId);
  };

  const handleMouseLeave = () => {
    setIsOverlayVisible('0');
  };

  const getFeeds = () => {
    api
      .readFeedList()
      .then((response) => {
        const data = response.data.data;
        setFeeds(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const getPopularFeed = () => {
    api
      .readPopularFeedList()
      .then((response) => {
        const data = response.data.data;
        setFeeds(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const getMyFeed = () => {
    api
      .readMyFeed()
      .then((response) => {
        const data = response.data.data;
        setFeeds(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <button className="border-2 m-2 p-2" onClick={getPopularFeed}>
        인기순 조회
      </button>
      <button className="border-2 m-2 p-2" onClick={getMyFeed}>
        내 피드 조회
      </button>
      {feeds.map((feed: any) => (
        <div key={feed?.feedId}>
          <div className="p-4">
            <div className="relative shadow-xl card w-96 bg-base-100" onMouseEnter={() => handleMouseEnter(feed.feedId)} onMouseLeave={handleMouseLeave}>
              <figure>
                <img src={`data:image/png;base64,${feed?.feedThumbnail}`} alt="feedImage" />
              </figure>
              <div className="card-body">
                <div>
                  <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
                    <div className="flex items-center justify-center flex-grow">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className="pl-2">유저이름</div>
                        <h2 className="card-title">{feed?.feedTitle}</h2>
                      </div>
                      <div>{feed.feedLikes}</div>
                    </div>
                  </button>
                </div>
                {ModalOpen && (
                  <div
                    className={'modal-container'}
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setModalOpen(false);
                      }
                    }}
                  >
                    <div className={'modal-content'}>
                      <p>리액트로 모달 구현하기</p>
                      <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                        모달 닫기
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link to={`/feeddetail/${feed.feedId}`}>
                {isOverlayVisible == feed.feedId && (
                  <div className="absolute inset-0 bg-black opacity-50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <p>This is the overlay text.</p>
                      <p>This is the overlay text.</p>
                      <p>This is the overlay text.</p>
                      <p>This is the overlay text.</p>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
