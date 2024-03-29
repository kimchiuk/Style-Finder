import Navbar from '../../widgets/nav/navbar';
import Button from '../../shared/ui/button/button';
import Image from '../../assets/images/aimodel.png';

import { useEffect, useState } from 'react';
import './cordi.css'

// import useLoginStore from '../../shared/store/useLoginStore';

// import { Link } from 'react-router-dom';

const Coordi = () => {
  // const loginStore = useLoginStore();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [coordiId, setCoordiId] = useState<string>('');

  const [outerCloth, setOuterCloth] = useState<string>(Image);
  const [upperBody, setUpperBody] = useState<string>(Image);
  const [lowerBody, setLowerBody] = useState<string>(Image);
  const [dress, setDress] = useState<string>(Image);

  // 첫 렌더링 시 api 로 설정
  const [outerClothes, setOuterClothes] = useState<string[]>([Image, Image, Image, Image, Image]);
  const [upperBodys, setUpperBodys] = useState<string[]>([Image, Image, Image, Image, Image]);
  const [lowerBodys, setLowerBodys] = useState<string[]>([Image, Image, Image, Image, Image]);
  const [dresses, setDresses] = useState<string[]>([Image, Image, Image, Image, Image]);

  const [outerList, setOuterList] = useState<string[]>(outerClothes.slice(0, outerClothes.length < 4 ? outerClothes.length : 4));
  const [upperList, setUpperList] = useState<string[]>(upperBodys.slice(0, upperBodys.length < 4 ? upperBodys.length : 4));
  const [lowerList, setLowerList] = useState<string[]>(lowerBodys.slice(0, lowerBodys.length < 4 ? lowerBodys.length : 4));
  const [dressList, setDressList] = useState<string[]>(dresses.slice(0, dresses.length < 4 ? dresses.length : 4));

  const [outerIndex, setOuterIndex] = useState<number>(0);
  const [upperIndex, setUpperIndex] = useState<number>(0);
  const [lowerIndex, setLowerIndex] = useState<number>(0);
  const [dressIndex, setDressIndex] = useState<number>(0);

  const [isScreenVisible, setIsScreenVisible] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'black'];

  useEffect(() => { });

  // 부위별 리스트 새로 고침
  const handleClickRefresh = (part: string, direction: number) => {
    const newList: string[] = [];
    let i: number = 0;

    if (part === 'outer') {
      if (direction === -1) {
        if (outerIndex - 8 < 0) setOuterIndex(0);
        else setOuterIndex(outerIndex - 8);
      }
      for (i = outerIndex; i < outerIndex + 4 && i < outerClothes.length; i++) newList.push(outerClothes[i]);
      setOuterList(newList);
      setOuterIndex(i);
    } else if (part === 'upper') {
      if (direction === -1) {
        if (upperIndex - 8 < 0) setUpperIndex(0);
        else setUpperIndex(upperIndex - 8);
      }
      for (i = upperIndex; i < upperIndex + 4 && i < upperBodys.length; i++) newList.push(upperBodys[i]);
      setUpperList(newList);
      setUpperIndex(i);
    } else if (part === 'lower') {
      if (direction === -1) {
        if (lowerIndex - 8 < 0) setLowerIndex(0);
        else setLowerIndex(lowerIndex - 8);
      }
      for (i = lowerIndex; i < lowerIndex + 4 && i < lowerBodys.length; i++) newList.push(lowerBodys[i]);
      setLowerList(newList);
      setLowerIndex(i);
    } else {
      if (direction === -1) {
        if (dressIndex - 8 < 0) setDressIndex(0);
        else setDressIndex(dressIndex - 8);
      }
      for (i = dressIndex; i < dressIndex + 4 && i < dresses.length; i++) newList.push(dresses[i]);
      setDressList(newList);
      setDressIndex(i);
    }
  };

  // 부위별 아이템 선택 시 이미지 변경
  const handleClickItem = (part: string, newItem: string) => {
    if (part === 'outer') setOuterCloth(newItem);
    else if (part === 'upper') setUpperBody(newItem);
    else if (part === 'lower') setLowerBody(newItem);
    else setDress(newItem);
  };

  // 내 옷장 모달 열기
  const handleClickCloset = () => { };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleCoordiIdChange = (newCoordiId: string) => {
    setCoordiId(newCoordiId);
  };

  // 피드 등록 버튼
  const handleCreateFeed = () => {
    const coordiCreateRequestDTO = {
      outerCloth: outerCloth,
      upperBody: upperBody,
      lowerBody: lowerBody,
      dress: dress,
    };

    coordiCreateRequestDTO;
    handleCoordiIdChange('9000'); // coordi api

    const feedCreateRequestDTO = {
      coordiId: coordiId,
      feedTitle: title,
      feedContent: content,
    };

    feedCreateRequestDTO; // feed api
  };

  // 카카오톡 공유 버튼
  const handleShareToKakao = () => { };

  // 검색 설정 화면 토글 버튼
  const toggleScreen = () => {
    setIsScreenVisible(!isScreenVisible);
  };

  // 검색 설정 카테고리 업데이트
  const handlesUpdateCategories = () => {
    setSelectedCategories([...selectedCategories]);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 검색 설정 색상 업데이트
  const handleUpdateColors = () => {
    setSelectedColors([...selectedColors]);
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((item) => item !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // 피드 등록 버튼
  const handleSearchItems = () => {
    setOuterClothes([Image, Image, Image, Image, Image]); // outer api
    setUpperBodys([Image, Image, Image, Image, Image]); // upper api
    setLowerBodys([Image, Image, Image, Image, Image]); // lower api
    setDresses([Image, Image, Image, Image, Image]); // dress api

    setOuterList(outerClothes.slice(0, outerClothes.length < 4 ? outerClothes.length : 4));
    setUpperList(upperBodys.slice(0, upperBodys.length < 4 ? upperBodys.length : 4));
    setLowerList(lowerBodys.slice(0, lowerBodys.length < 4 ? lowerBodys.length : 4));
    setDressList(dresses.slice(0, dresses.length < 4 ? dresses.length : 4));
  };
  return (
    <>
      <Navbar></Navbar>
      <div>
        {/* {!loginStore.isLogin ? (
          // 로그아웃 상태
          <div>
            <div>코디</div>
            <Link to="/">
              <div>홈으로 돌아가기</div>
            </Link>
          </div>
        ) : ( */}
        {/* // 로그인 상태 */}
        <div>
          <div>코디</div>
          <div className="mx-auto px-36">
            <div className="p-2 m-2 bg-gray-100 rounded-lg ">
              <div className='  '>
                <div className='w-auto'>
                  <button onClick={toggleScreen}>검색 설정</button>
                  {isScreenVisible && (
                    <div>
                      <div>
                        <h2>카테고리 선택</h2>
                        <div className="flex flex-wrap">
                          {categories.map((category) => (
                            <button
                              key={category}
                              className={`rounded-full px-4 py-2 m-2 shadow-md cursor-pointer ${selectedCategories.includes(category) ? 'selected' : 'button'}`}
                              onClick={() => toggleCategory(category)}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2>색상 선택</h2>
                        <div className="flex flex-wrap">
                          {colors.map((color) => (
                            <button
                              key={color}
                              className={`rounded-full px-4 py-2 m-2 shadow-md cursor-pointer ${selectedColors.includes(color) ? 'selected' : 'button'}`}
                              onClick={() => toggleColor(color)}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button value="검색" onClick={() => handleSearchItems} />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col'>
                <label>아우터</label>
                <div className="flex">
                  <img id="outer" src={outerCloth} onClick={() => handleClickCloset} />

                  <div className="flex">
                    {outerList.map((item) => (
                      <div>
                        <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item} alt="" />
                        <Button
                          onClick={() => {
                            handleClickItem('outer', item);
                          }}
                          value="선택"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      handleClickRefresh('outer', -1);
                    }}
                    value="<"
                  />
                  <Button
                    onClick={() => {
                      handleClickRefresh('outer', 1);
                    }}
                    value=">"
                  />
                </div>

                <label>상의</label>
                <div className="flex">
                  <img id="upper" src={upperBody} onClick={handleClickCloset} />

                  <div className="flex">
                    {upperList.map((item) => (
                      <div>
                        <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item} alt="" />
                        <Button
                          onClick={() => {
                            handleClickItem('upper', item);
                          }}
                          value="선택"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      handleClickRefresh('upper', -1);
                    }}
                    value="<"
                  />
                  <Button
                    onClick={() => {
                      handleClickRefresh('upper', 1);
                    }}
                    value=">"
                  />
                </div>

                <label>하의</label>
                <div className="flex">
                  <img id="lower" src={lowerBody} onClick={() => handleClickCloset} />
                  <div className="flex">
                    {lowerList.map((item) => (
                      <div>
                        <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item} alt="" />
                        <Button
                          onClick={() => {
                            handleClickItem('lower', item);
                          }}
                          value="선택"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      handleClickRefresh('lower', -1);
                    }}
                    value="<"
                  />
                  <Button
                    onClick={() => {
                      handleClickRefresh('lower', 1);
                    }}
                    value=">"
                  />
                </div>

                <label>드레스</label>
                <div className="flex">
                  <img id="dress" src={dress} onClick={() => handleClickCloset} />
                  <div className="flex">
                    {dressList.map((item) => (
                      <div>
                        <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item} alt="" />
                        <Button
                          onClick={() => {
                            handleClickItem('dress', item);
                          }}
                          value="선택"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      handleClickRefresh('dress', -1);
                    }}
                    value="<"
                  />
                  <Button
                    onClick={() => {
                      handleClickRefresh('dress', 1);
                    }}
                    value=">"
                  />
                </div>
                <div>
                  <label className='mr-3 text'>제목</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    className="rounded-full border border-gray-300 p-2"
                  />
                </div>

                <div className="textarea-container mr-4">
                  <label className="textarea-label">내용</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(event) => handleContentChange(event.target.value)}
                    rows={4}
                    cols={50}
                    className="textarea-field"
                  ></textarea>
                </div>
                <Button value="피드 등록" onClick={() => handleCreateFeed} />
                <Button value="카카오톡 공유" onClick={() => handleShareToKakao} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coordi;
