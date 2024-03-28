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

  const unselected =
    'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
  const selected =
    'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

  const [isOverlayVisible, setIsOverlayVisible] = useState('0');
  const [ModalOpen, setModalOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState([1]);
  const [feedListType, setFeedListType] = useState('all');

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
        setFeedListType('all')

        return Math.trunc(data.length / 8);
      })
      .then((endPage) => {
        updatePageList(endPage + 1);
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
        setFeedListType('popular')

        return Math.trunc(data.length / 8);
      })
      .then((endPage) => {
        updatePageList(endPage + 1);
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
        setFeedListType('my')

        return Math.trunc(data.length / 8);
      })
      .then((endPage) => {
        updatePageList(endPage + 1);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const searchFeed = () => {
    if (query === '') {
      return;
    }

    api
      .searchByTitle(query, page)
      .then((response) => {
        // console.log(response.data.content)
        const data = response.data.content;
        setFeeds(data);
        setFeedListType('search')
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const updatePageList = (endPage: number) => {
    let numberArray = [];
    let count = 0;

    for (let i = endPage; ; i--) {
      if (i == 0) break;
      if (count == 5) break;
      numberArray.unshift(i);
      count++;
    }

    console.log(numberArray, endPage);

    setPageList(numberArray);
  };

  useEffect(() => {
    if (feedListType === 'all') {
      getFeeds();
    } else if (feedListType === 'my') {
      getMyFeed();
    } else if (feedListType === 'popular') {
      getPopularFeed();
    } else if (feedListType === 'search') {
      searchFeed();
    }
  }, [page]);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="flex justify-around">
          <button className="border-2 m-2 p-2" onClick={getPopularFeed}>
            인기순 조회
          </button>
          <div className="w-100">
            <input className="border-2 m-2 p-2" value={query} onChange={(event) => setQuery(event.target.value)} required></input>
            <button onClick={searchFeed}>검색</button>
          </div>
          <button className="border-2 m-2 p-2" onClick={getMyFeed}>
            내 피드 조회
          </button>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-2">
          {feeds.map((feed: any) => (
            <div key={feed?.feedId}>
              <div className="p-4">
                <div className="relative card bg-base-100" onMouseEnter={() => handleMouseEnter(feed.feedId)} onMouseLeave={handleMouseLeave}>
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
                          <div className="flex flex-col">
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
        </div>
        <div className="flex items-center gap-4 justify-center my-10">
          <div className="flex items-center gap-2">
            {pageList.map((pageNumber) => (
              <button key={pageNumber} className={page === pageNumber ? selected : unselected} type="button" value={pageNumber} onClick={() => setPage(pageNumber)}>
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{pageNumber}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
