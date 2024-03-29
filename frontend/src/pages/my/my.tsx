import { useEffect, useState } from 'react';
import Keywords from '../../features/analysis/kewords';
import useUserStore from '../../shared/store/useUserStore';
import api from '../../entities/user/user-apis';
import { axiosError } from '../../shared/utils/axiosError';
import { UserInfo } from '../../entities/user/user-types';
import useLoginStore from '../../shared/store/useLoginStore';
import { useNavigate } from 'react-router';

// import { ResponsivePieCanvas } from '@nivo/pie';

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

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateImgage, setUpdateImage] = useState<File | null>();

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [nickname, setNickname] = useState('');
  const [likeCategories, setLikeCategories] = useState<string[]>([]);
  const [dislikeCategories, setDislikeCategories] = useState<string[]>([]);

  const [heightValid, setHeightValid] = useState(true);
  const [weightValid, setWeightValid] = useState(true);

  const modifyUserInfo = () => {
    const request: any = new FormData();

    const profileImage = updateImgage;
    const signUpRequest = new Blob(
      [
        JSON.stringify({
          nickname: nickname,
          height: height,
          weight: weight,
          likeCategories: likeCategories,
          dislikeCategories: dislikeCategories,
        }),
      ],
      { type: 'application/json' },
    );

    request.append('profileImage', profileImage);
    request.append('signUpRequest', signUpRequest);

    api
      .updateUserInfo(request)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  const convertIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const validateNumber = (value: string) => {
    return /^[0-9]*$/.test(value) && value.length > 0;
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setHeight(value);
    setHeightValid(validateNumber(value));
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setWeight(value);
    setWeightValid(validateNumber(value));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUpdateImage(file);
    }
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        const data: UserInfo = response.data.data;
        setUserInfo(data);

        setHeight(data.height);
        setWeight(data.weight);
        setNickname(data.nickname);
        setLikeCategories(data.likeCategories);
        setDislikeCategories(data.dislikeCategories);
      })
      .catch((error: any) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  }, []);

  return (
    <div>
      <div>내 정보</div>
      <div className="w-auto card bg-base-100">
        <div className="card-body">
          <div className="flex flex-row">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={`data:image/png;base64,${userInfo?.profileImage}`} />
                {isUpdate && (
                  <div className="inputWrap mb-5 customInputWrap">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="customFileInput" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-4">
              {isUpdate ? (
                <div>
                  <button onClick={modifyUserInfo}>저장</button>
                  <button onClick={convertIsUpdate}>취소</button>
                </div>
              ) : (
                <div>
                  <button onClick={convertIsUpdate}>수정</button>
                </div>
              )}
              <div>{userInfo?.nickname} 님</div>
              <div>
                키: {userInfo?.height}cm, 몸무게: {userInfo?.weight}kg
              </div>
            </div>
          </div>
          <div>
            <div>선호 : {userInfo?.likeCategories.map((category) => <span key={category}>{category} </span>)}</div>
            <div>비선호 : {userInfo?.dislikeCategories.map((category) => <span key={category}>{category} </span>)}</div>
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
