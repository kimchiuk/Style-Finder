import Navbar from '../../widgets/nav/navbar';

import { useState } from 'react';
import './coordi.css';

import Image from '../../assets/images/noimage.png';
import useOpenModal from '../../shared/hooks/use-open-modal';
import Modal from '../../shared/ui/modal/Modal';
import MyClosetReadModal from '../closet/my-closet-read-modal';
import Button from '../../shared/ui/button/button';
import { Cloth } from '../../entities/closet/closet-types';

const CoordiFromCoordi = () => {
  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [coordiId, setCoordiId] = useState<string>('');

  const [outerCloth, setOuterCloth] = useState<Cloth | null>(null);
  const [upperBody, setUpperBody] = useState<Cloth | null>(null);
  const [lowerBody, setLowerBody] = useState<Cloth | null>(null);
  const [dress, setDress] = useState<Cloth | null>(null);

  const [outerClothes, setOuterClothes] = useState<Cloth[]>([]);
  const [upperBodys, setUpperBodys] = useState<Cloth[]>([]);
  const [lowerBodys, setLowerBodys] = useState<Cloth[]>([]);
  const [dresses, setDresses] = useState<Cloth[]>([]);

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

  // 부위별 아이템 선택 시 이미지 변경
  const handleClickItem = (newItem: Cloth) => {
    if (newItem.part === 'outer') setOuterCloth(newItem);
    else if (newItem.part === 'upper') setUpperBody(newItem);
    else if (newItem.part === 'lower') setLowerBody(newItem);
    else setDress(newItem);
  };

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
  const handleShareToKakao = () => {};

  // 검색 설정 화면 토글 버튼
  const toggleScreen = () => {
    setIsScreenVisible(!isScreenVisible);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
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
    setOuterClothes([]); // outer api
    setUpperBodys([]); // upper api
    setLowerBodys([]); // lower api
    setDresses([]); // dress api
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div>코디</div>
        <div className="mx-auto px-36">
          <div className="p-2 m-2 bg-gray-100 rounded-lg ">
            <div className="">
              <div className="w-auto">
                <button onClick={toggleScreen}>검색 설정</button>
                {isScreenVisible && (
                  <div>
                    <div>
                      <h2>카테고리 선택</h2>
                      <div className="flex flex-wrap">
                        {categories.map((category, index) => (
                          <Button
                            key={index}
                            className={`rounded-full px-4 py-2 m-2 shadow-md cursor-pointer ${selectedCategories.includes(category) ? 'selected' : 'button'}`}
                            value={category}
                            onClick={() => toggleCategory(category)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2>색상 선택</h2>
                      <div className="flex flex-wrap">
                        {colors.map((color, index) => (
                          <Button
                            key={index}
                            className={`rounded-full px-4 py-2 m-2 shadow-md cursor-pointer ${selectedColors.includes(color) ? 'selected' : 'button'}`}
                            value={color}
                            onClick={() => toggleColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    <button value="검색" onClick={() => handleSearchItems} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label>아우터</label>
              <div className="flex">
                {!outerCloth ? <img id="outer" src={Image} /> : <img id="outer" src={outerCloth.image} />}
                <Button value="옷장" onClick={() => clickModal} />

                <div className="flex">
                  {outerClothes.map((item, index) => (
                    <div key={index}>
                      <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item.image} alt="" />
                      <Button
                        onClick={() => {
                          handleClickItem(item);
                        }}
                        value="선택"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <label>상의</label>
              <div className="flex">
                {!upperBody ? <img id="upper" src={Image} /> : <img id="upper" src={upperBody.image} />}
                <Button value="옷장" onClick={() => clickModal} />

                <div className="flex">
                  {upperBodys.map((item, index) => (
                    <div key={index}>
                      <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item.image} alt="" />
                      <Button
                        onClick={() => {
                          handleClickItem(item);
                        }}
                        value="선택"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <label>하의</label>
              <div className="flex">
                {!lowerBody ? <img id="lower" src={Image} /> : <img id="lower" src={lowerBody.image} />}
                <Button value="옷장" onClick={() => clickModal} />

                <div className="flex">
                  {lowerBodys.map((item, index) => (
                    <div key={index}>
                      <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item.image} alt="" />
                      <Button
                        onClick={() => {
                          handleClickItem(item);
                        }}
                        value="선택"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <label>드레스</label>
              <div className="flex">
                {!dress ? <img id="dress" src={Image} /> : <img id="dress" src={dress.image} />}
                <Button value="옷장" onClick={() => clickModal} />

                <div className="flex">
                  {dresses.map((item, index) => (
                    <div key={index}>
                      <img className="p-2 m-2 bg-gray-200 rounded-lg" src={item.image} alt="" />
                      <Button
                        onClick={() => {
                          handleClickItem(item);
                        }}
                        value="선택"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="mr-3 text">제목</label>
                <input type="text" id="title" value={title} onChange={(event) => handleTitleChange(event.target.value)} className="p-2 border border-gray-300 rounded-full" />
              </div>

              <div className="mr-4 textarea-container">
                <label className="textarea-label">내용</label>
                <textarea id="content" value={content} onChange={(event) => handleContentChange(event.target.value)} rows={4} cols={50} className="textarea-field"></textarea>
              </div>
              <button value="피드 등록" onClick={() => handleCreateFeed} />
              <button value="카카오톡 공유" onClick={() => handleShareToKakao} />
            </div>
          </div>
        </div>
        <Modal isOpen={isOpenModal} onClose={closeModal}>
          <div>내 옷장</div>
          <MyClosetReadModal />
        </Modal>
        s
      </div>
    </>
  );
};

export default CoordiFromCoordi;
