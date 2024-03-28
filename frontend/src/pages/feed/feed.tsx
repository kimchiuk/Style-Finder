import Navbar from '../../widgets/nav/navbar';

import { useEffect, useRef, useState } from 'react';
//import useLoginStore from '../../shared/store/useLoginStore';
//import useUserStore from '../../shared/store/useUserStore';
import { Link } from 'react-router-dom'; // Link import
import './feed.css';
import api from '../../entities/feed/feed-apis';
//import { error } from 'console';
import { axiosError } from '../../shared/utils/axiosError';

const Feed = () => {
  //const loginStore = useLoginStore();
  //const userStore = useUserStore();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  //const [feeds, setFeeds] = useState([])

  const modalBackground = useRef(null);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  const getFeeds = () => {
    api
      .readFeedList()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        axiosError(error);
      });
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="p-4">
          <div>
            <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
              <div className="flex items-center justify-center flex-grow">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="pl-2">유저이름</div>
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
          <div className="relative shadow-xl card w-96 bg-base-100" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <figure>
              <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <Link to="/feeddetail">
              {isOverlayVisible && (
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
    </>
  );
};

export default Feed;
