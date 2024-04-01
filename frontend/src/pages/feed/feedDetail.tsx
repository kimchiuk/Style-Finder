/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Navbar from '../../widgets/nav/navbar';
import { useParams } from 'react-router';
import api from '../../entities/feed/feed-apis';
import { axiosError } from '../../shared/utils/axiosError';
import { FeedInfo } from '../../entities/feed/feed-types';
import './feed.css';

const FeedDetail: React.FC = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const [feedInfo, setFeedInfo] = useState<FeedInfo>();
  const [isChecked, setIsChecked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleIconClick = () => {
    setIsChecked(!isChecked);
    setLikesCount(isChecked ? likesCount - 1 : likesCount + 1);
  };

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
  }, [feedId]);

  return (
    <>
      <Navbar />
      <div className="pt-5 mx-auto px-36">
        <div className="flex flex-row max-w-screen-xl hero max-h-screen-xl bg-base-200">
          <div className="flex-col pr-10 hero-content lg:flex-row">
            <img src={`data:image/png;base64,${feedInfo?.feedThumbnail}`} className="max-w-md rounded-lg shadow-2xl" />
            <div className="flex justify-center pt-5 author-name">피드 제목: {feedInfo?.feedTitle}</div>
            <div className="flex justify-center">최초등록자 : {feedInfo?.originWriter}</div>
            <div className="flex flex-row justify-between pt-3">
              <button className="btn btn-outline custom-button">피팅 해보기</button>
              <div className="flex flex-row">
                {feedInfo?.feedLikes}
                <label className="pl-2 swap swap-flip text-9xl">
                  <input type="checkbox" onChange={() => {}} style={{ display: 'none' }} />
                  <div className={isChecked ? 'swap-on' : 'swap-off'} onClick={handleIconClick}>
                    {isChecked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row">
              <div>
                <img src={`data:image/png;base64,${feedInfo?.user.profileImage}`} alt="profileImage" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div className="pl-5 author-name">작성자 닉네임: {feedInfo?.user.nickname}</div>
                <div className="pl-5">피드 내용: {feedInfo?.feedContent}</div>
              </div>
            </div>
            <div className="flex justify-center pt-5 author-name">Comments</div>
            {feedInfo?.comments.map((comment) => (
              <div key={comment.nickname} className="flex items-center justify-center">
                <div className="flex items-start flex-grow max-w-screen-xl mt-5 hero max-h-screen-xl bg-base-200 ">
                  <div className="avatar">
                    <div>
                      <img src={`data:image/png;base64,${comment.profileImage}`} alt="commentProfileImage" className="w-10 h-10 rounded-full" />
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
        </div>
      </div>
    </>
  );
};

export default FeedDetail;
