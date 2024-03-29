/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../../widgets/nav/navbar';
// import useLoginStore from '../../shared/store/useLoginStore';
import { useEffect, useState } from 'react';
import api from '../../entities/feed/feed-apis';
import { useParams } from 'react-router';
import { axiosError } from '../../shared/utils/axiosError';
import { FeedInfo } from '../../entities/feed/feed-types';
//import useUserStore from '../shared/store/useUserStore';

const FeedDetail = () => {
  const { feedId } = useParams();
  // const loginStore = useLoginStore();
  // const userStore = useUserStore();

  const [feedInfo, setFeedInfo] = useState<FeedInfo>();

  // const deleteFeed = () => {}

  useEffect(() => {
    api
      .readFeed(Number(feedId))
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setFeedInfo(data);
      })
      .catch((error: any) => {
        axiosError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center">ITEMS</div>
        <div className="flex justify-center">
          <div className="flex flex-col max-w-screen-xl hero max-h-screen-xl bg-base-200">
            <div className="flex-col hero-content lg:flex-row">
              <img src={`data:image/png;base64,${feedInfo?.feedThumbnail}`} className="max-w-sm rounded-lg shadow-2xl" />
            </div>
            <div>
              <img src={`data:image/png;base64,${feedInfo?.user.profileImage}`} alt="profileImage" className="w-36" />
              <div>작성자 닉네임: {feedInfo?.user.nickname}</div>
              <div>피드 제목: {feedInfo?.feedTitle}</div>
              <div>피드 내용: {feedInfo?.feedContent}</div>
              <div>좋아요 수: {feedInfo?.feedLikes}</div>
              <div>최초등록자 : {feedInfo?.originWriter}</div>
              <button className="btn btn-outline">피팅 해보기</button>
            </div>
          </div>
        </div>
        <div>Comments</div>
        {feedInfo?.comments.map((comment) => (
          <div key={comment.nickname} className="flex items-center justify-center">
            <div className="flex items-start flex-grow max-w-screen-xl mt-5 hero max-h-screen-xl bg-base-200 ">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src={`data:image/png;base64,${comment.profileImage}`} />
                </div>
              </div>
              <div className="flex justify-between flex-grow">
                <div>
                  <div className="ml-3">{comment.nickname}</div>
                  <div className="ml-3">{comment.content}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default FeedDetail;
