/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../../widgets/nav/navbar';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link import
import './feed.css';
import api from '../../entities/feed/feed-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';

const Feed = () => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  const unselected =
    'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
  const selected =
    'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

  const [isOverlayVisible, setIsOverlayVisible] = useState('0');
  const [ModalOpen, setModalOpen] = useState(0);
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
      .readFeedList(page - 1)
      .then((response) => {
        const data = response.data.data;

        if (feedListType != 'all') {
          setPage(1);
        }

        setFeeds(data);
        setFeedListType('all');

        console.log(data);

        const totalPage = response.data.totalPage;
        return totalPage;
      })
      .then((endPage) => {
        updatePageList(endPage);
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
      .readPopularFeedList(page - 1)
      .then((response) => {
        const data = response.data.data;

        if (feedListType != 'popular') {
          setPage(1);
        }

        setFeeds(data);
        setFeedListType('popular');

        const totalPage = response.data.totalPage;
        return totalPage;
      })
      .then((endPage) => {
        updatePageList(endPage);
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
      .readMyFeed(page - 1)
      .then((response) => {
        const data = response.data.data;

        if (feedListType != 'my') {
          setPage(1);
        }

        setFeeds(data);
        setFeedListType('my');

        const totalPage = response.data.totalPage;
        return totalPage;
      })
      .then((endPage) => {
        updatePageList(endPage);
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
      .searchByTitle(query, page - 1)
      .then((response) => {
        const data = response.data.data;

        if (feedListType != 'search') {
          setPage(1);
        }

        setFeeds(data);
        setFeedListType('search');

        const totalPage = response.data.totalPage;
        return totalPage;
      })
      .then((endPage) => {
        updatePageList(endPage);
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
    const numberArray = [];
    let count = 0;

    for (let i = endPage; ; i--) {
      if (i == 0) break;
      if (count == 5) break;
      numberArray.unshift(i);
      count++;
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="flex justify-around">
          <button className="p-2 m-2 border-2" onClick={getPopularFeed}>
            인기순 조회
          </button>
          <div className="w-100">
            <input className="p-2 m-2 border-2" value={query} onChange={(event) => setQuery(event.target.value)} required></input>
            <button
              onClick={() => {
                searchFeed();
                setPage(1);
              }}
            >
              검색
            </button>
          </div>
          <button className="p-2 m-2 border-2" onClick={getMyFeed}>
            내 피드 조회
          </button>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-4">
          {feeds.map((feed: any) => (
            <div key={feed?.feedId}>
              <div className="p-4">
                <div className="relative card bg-base-100" onMouseEnter={() => handleMouseEnter(feed.feedId)} onMouseLeave={handleMouseLeave}>
                  <div className="card-body">
                    <figure>
                      <img src={`data:image/png;base64,${feed?.feedThumbnail}`} alt="feedImage" />
                    </figure>
                    {ModalOpen === feed.feedId && (
                      <div
                        className={'modal-container'}
                        ref={modalBackground}
                        onClick={(e) => {
                          if (e.target === modalBackground.current) {
                            setModalOpen(0);
                          }
                        }}
                      >
                        <div className={'modal-content'}>
                          <img src={`data:image/png;base64,${feed?.feedThumbnail}`} alt="feedImage" className="w-20" />
                          <p>{feed.user.nickname}</p>
                          <div className="flex">
                            {feed.user.likeCategories.map((category: string) => (
                              <p className="p-2">{category}</p>
                            ))}
                          </div>
                          <div className="flex">
                            {feed.user.dislikeCategories.map((category: string) => (
                              <p className="p-2">{category}</p>
                            ))}
                          </div>
                          <p>{feed.user.introduce}</p>
                          <p>{feed.user.instagram}</p>
                          <p>{feed.user.youtube}</p>
                          <button className={'modal-close-btn'} onClick={() => setModalOpen(0)}>
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
                          {feed.coordiContainer.outerCloth && <p>아우터: {feed.coordiContainer.outerCloth}</p>}
                          {feed.coordiContainer.upperBody && <p>상의: {feed.coordiContainer.upperBody}</p>}
                          {feed.coordiContainer.lowerBody && <p>하의: {feed.coordiContainer.lowerBody}</p>}
                          {feed.coordiContainer.dress && <p>드레스: {feed.coordiContainer.dress}</p>}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
                <div>
                  <button className={'modal-open-btn'} onClick={() => setModalOpen(feed.feedId)}>
                    <div className="flex items-center justify-center flex-grow">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={`data:image/png;base64,${feed.user.profileImage}`} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="pl-2">{feed.user.nickname}</div>
                        <h2 className="card-title">{feed?.feedTitle}</h2>
                      </div>
                      <div>{feed.feedLikes}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 my-10">
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
