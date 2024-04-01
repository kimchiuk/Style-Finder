/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import Keywords from '../../features/analysis/kewords';
import useUserStore from '../../shared/store/use-user-store';
import api from '../../entities/user/user-apis';
import { axiosError } from '../../shared/utils/axiosError';
import { UserInfo } from '../../entities/user/user-types';
import useLoginStore from '../../shared/store/use-login-store';
import { useNavigate } from 'react-router';

const style = [
  '레트로',
  '로맨틱',
  '리조트',
  '매니시',
  '모던',
  '밀리터리',
  '섹시',
  '소피스트케이티드',
  '스트리트',
  '스포티',
  '아방가르드',
  '오리엔탈',
  '웨스턴',
  '젠더리스',
  '컨트리',
  '클래식',
  '키치',
  '톰보이',
  '펑크',
  '페미닌',
  '프레피',
  '히피',
  '힙합',
];

const categories = [
  '재킷',
  '조거팬츠',
  '짚업',
  '스커트',
  '가디건',
  '점퍼',
  '티셔츠',
  '셔츠',
  '팬츠',
  '드레스',
  '패딩',
  '청바지',
  '점프수트',
  '니트웨어',
  '베스트',
  '코트',
  '브라탑',
  '블라우스',
  '탑',
  '후드티',
  '래깅스',
];

const My = () => {
  const userStore = useUserStore();
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const modalBackground = useRef(null);

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [isUpdate, setIsUpdate] = useState(false);

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [dislikeCategories, setDislikeCategories] = useState<string[]>([]);

  const [heightValid, setHeightValid] = useState(true);
  const [weightValid, setWeightValid] = useState(true);
  const [notAllow, setNotAllow] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleOptionRemove = (option: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  useEffect(() => {
    setNotAllow(!(heightValid && weightValid && nickname));
  }, [heightValid, weightValid, nickname]);

  const validateNumber = (value: string) => {
    return /^[0-9]*$/.test(value) && value.length > 0;
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(Number(value));
    setHeightValid(validateNumber(value));
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(Number(value));
    setWeightValid(validateNumber(value));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const modifyUserInfo = () => {
    if (notAllow) return;

    const request: any = new FormData();

    const profileImage = image;
    const updateUserInfoRequest = new Blob(
      [
        JSON.stringify({
          nickname: nickname,
          height: height,
          weight: weight,
          likeCategories: selectedOptions,
          dislikeCategories: dislikeCategories,
        }),
      ],
      { type: 'application/json' },
    );

    request.append('profileImage', profileImage);
    request.append('updateUserInfoRequest', updateUserInfoRequest);

    api
      .updateUserInfo(request)
      .then((response) => {
        console.log(response);
        setIsUpdate(false);
        getUserInfo();
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const getUserInfo = () => {
    api
      .getUserInfo()
      .then((response) => {
        const data: UserInfo = response.data.data;
        setUserInfo(data);

        setHeight(data.height);
        setWeight(data.weight);
        setNickname(data.nickname);

        let likeCategories: string[] = [];

        data.likeCategories.forEach((category) => {
          if (category !== '') {
            likeCategories.push(category);
          }
        });

        setSelectedOptions(likeCategories);
      })
      .catch((error: any) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <div>내 정보</div>
      <div className="w-auto card bg-base-100">
        <div className="card-body">
          <div className="flex flex-row">
            <div className="avatar">
              <div className="w-12 rounded-full">{userInfo?.profileImage && <img src={`data:image/png;base64,${userInfo?.profileImage}`} />}</div>
            </div>
            <div className="flex flex-col ml-4">
              <div>
                <button onClick={() => setIsUpdate(true)}>수정</button>
              </div>
              <div>{userInfo?.nickname} 님</div>
              <div>
                키: {userInfo?.height}cm, 몸무게: {userInfo?.weight}kg
              </div>
              <div>선호: {userInfo?.likeCategories.map((category) => <span className="border-2">{category}</span>)}</div>
              {isUpdate && (
                <div
                  className={'modal-container'}
                  ref={modalBackground}
                  onClick={(e) => {
                    if (e.target === modalBackground.current) {
                      setIsUpdate(false);
                    }
                  }}
                >
                  <div className="flex justify-between bg-white">
                    <div>
                      <div className="mb-5 inputWrap">
                        <input className="input" placeholder="닉네임 입력" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                      </div>
                      <div className="flex flex-row">
                        <div>
                          <div className="mb-5 mr-5 inputWrap">
                            <input className="w-16 mr-2 input" placeholder="키 입력" value={height} onChange={handleHeight} />
                            cm
                          </div>
                        </div>
                        <div>
                          <div className="inputWrap">
                            <input className="w-24 mr-2 input" placeholder="몸무게 입력" value={weight} onChange={handleWeight} />
                            kg
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 inputTitle">프로필 이미지 수정</div>
                      <div className="mb-5 inputWrap customInputWrap">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="customFileInput" />
                      </div>
                      <select className="w-full max-w-xs select select-bordered" onChange={handleSelectChange}>
                        <option disabled selected>
                          당신의 취향을 골라주세요
                        </option>
                        <option value="재킷">재킷</option>
                        <option value="조거팬츠">조거팬츠</option>
                        <option value="짚업">짚업</option>
                        <option value="스커트">스커트</option>
                        <option value="가디건">가디건</option>
                        <option value="점퍼">점퍼</option>
                        <option value="티셔츠">티셔츠</option>
                        <option value="셔츠">셔츠</option>
                        <option value="팬츠">팬츠</option>
                        <option value="드레스">드레스</option>
                        <option value="패딩">패딩</option>
                        <option value="청바지">청바지</option>
                        <option value="점프수트">점프수트</option>
                        <option value="니트웨어">니트웨어</option>
                        <option value="베스트">베스트</option>
                        <option value="코트">코트</option>
                        <option value="브라탑">브라탑</option>
                        <option value="블라우스">블라우스</option>
                        <option value="탑">탑</option>
                        <option value="후드티">후드티</option>
                        <option value="래깅스">래깅스</option>
                      </select>

                      {/* 선택된 옵션들 표시 */}
                      {selectedOptions.length > 0 && (
                        <div>
                          <p className="flex justify-center mt-3">선택된 옵션들</p>
                          {selectedOptions
                            .reduce((rows: string[][], option, index) => {
                              if (index % 2 === 0) rows.push([] as string[]);
                              rows[rows.length - 1].push(option);
                              return rows;
                            }, [])
                            .map((row, rowIndex) => (
                              <div className="flex justify-between option-box-container" key={rowIndex}>
                                {row.map((option) => (
                                  <div className="option-box" key={option}>
                                    {option}
                                    <button className="option-button" onClick={() => handleOptionRemove(option)}>
                                      취소
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                      )}
                      <div>
                        <button className="p-2 m-2 border-2" onClick={modifyUserInfo}>
                          저장
                        </button>
                        <button className="p-2 m-2 border-2" onClick={() => setIsUpdate(false)}>
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="content-center">
        <Keywords />
      </div>
      <div className="mt-6">당신의 취향은?</div>
      <div className="w-auto card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
      <div className="mt-6">당신의 옷장은?</div>
      <div className="w-auto card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
      <div className="mt-6">내 옷장</div>
      <div className="w-auto card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
    </div>
  );
};

export default My;
