/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../../widgets/nav/navbar';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link import
import './feed.css';
import api from '../../entities/feed/feed-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';
import noimage from '../../assets/images/noimage.png';
import { userInfo } from 'os';

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
      <div className="mx-auto px-36 ">
        <div className="flex justify-around ">
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
              <div className="p-2">
                <div className="relative card bg-base-100" onMouseEnter={() => handleMouseEnter(feed.feedId)} onMouseLeave={handleMouseLeave}>
                  <div className="card-body">
                    <figure>
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          {feed?.outerCloth ? (
                            <img src={`data:image/png;base64,${feed?.outerCloth}`} alt="Outer Cloth" className="w-2/4 h-32" />
                          ) : (
                            <img src={noimage} alt="Default Outer Cloth" className="w-2/4 h-32" />
                          )}
                          {feed?.dress ? (
                            <img src={`data:image/png;base64,${feed?.dress}`} alt="Dress" className="w-2/4 h-32" /> 
                          ): (
                            <img src={noimage} alt="Default Dress" className="w-2/4 h-32" />
                          )}
                        </div>
                        <div className="flex flex-row">
                          {feed?.upperBody ? (
                            <img src={`data:image/png;base64,${feed?.upperBody}`} alt="Upper Body" className="w-2/4 h-32" />
                          ) : (
                            <img src={noimage} alt="Default Upper Body" className="w-2/4 h-32" />
                          )}
                          {feed?.lowerBody ? (
                            <img src={`data:image/png;base64,${feed?.lowerBody}`} alt="Lower Body" className="w-2/4 h-32" />
                          ) : (
                            <img src={noimage} alt="Default Lower Body" className="w-2/4 h-32" />
                          )}
                        </div>
                      </div>
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
                        <div className="modal-content w-1/2 h-2/5 flex justify-evenly items-center ">
                          <div className="pr-5 pl-5 basis-1/3">
                            <img src={`data:image/png;base64,${feed.user.profileImage}`} alt="feedImage" className="w-36 h-36 rounded-lg" />
                            <p>{feed.user.instagram}</p>
                            <p>{feed.user.youtube}</p>
                          </div>
                          <div className="flex flex-col basis-2/3">
                            <p className="text-xl pb-3">{feed.user.nickname}</p>
                            <div className="introduction-box">
                              <p>{feed.user.introduce}</p>
                            </div>
                            <div className="flex likebox">
                              {feed.user.likeCategories.map((category: string) => (
                                <p className="pt-2 pr-2">{category}</p>
                              ))}
                            </div>
                            {/* <div className="flex likebox">
                              {feed.user.dislikeCategories.map((category: string) => (
                                <p className="pt-2 pr-2">{category}</p>
                              ))}
                            </div> */}
                            <div>
                              <button className="modal-close-btn closebutton" onClick={() => setModalOpen(0)}>
                                모달 닫기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link to={`/feeddetail/${feed.feedId}`}>
                    {isOverlayVisible == feed.feedId && (
                      <div className="absolute inset-0 bg-black opacity-50">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          {feed.coordiContainer?.outerCloth?.category && <p>아우터: {feed.coordiContainer?.outerCloth?.category}</p>}
                          {feed.coordiContainer?.upperBody?.category && <p>상의: {feed.coordiContainer?.upperBody?.category}</p>}
                          {feed.coordiContainer?.lowerBody?.category && <p>하의: {feed.coordiContainer?.lowerBody?.category}</p>}
                          {feed.coordiContainer?.dress?.category && <p>드레스: {feed.coordiContainer?.dress?.category}</p>}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <button className={'modal-open-btn'} onClick={() => setModalOpen(feed.feedId)}>
                    <div className="flex justify-between pt-2">
                      <div>
                        <img src={`data:image/png;base64,${feed.user.profileImage}`} className="rounded-lg w-12 h-12" />
                      </div>
                      <div className="text-center">
                        <div className="flex flex-row ml-4">
                          <div className="flex flex-col">
                            <div>{feed.user.nickname}</div>
                            <h2>{feed?.feedTitle}</h2>
                          </div>
                        </div>
                      </div>
                      {/* <div>{feed.feedLikes}</div> */}
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
