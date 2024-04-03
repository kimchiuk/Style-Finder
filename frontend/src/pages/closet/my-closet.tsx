/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import MyClosetItem from './my-closet-Item';
import MyClosetCreateForm from './my-closet-create-form';

import Button from '../../shared/ui/button/button';
import Modal from '../../shared/ui/modal/Modal';
import useOpenModal from '../../shared/hooks/use-open-modal';
import { useNavigate } from 'react-router';

import api from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';
import { ClosetCloth } from '../../entities/closet/closet-types';
import WhiteButton from '../../shared/ui/button/white-button';

const MyCloset = () => {
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const [ItemList, setItemList] = useState<ClosetCloth[]>([]);

  useEffect(() => {
    handleClickOption('');
  }, []);

  // 해당 아이템 코디 해 보기
  const handleClickItem = (selectedItem: ClosetCloth) => {
    const parsing = selectedItem.imageUrl.split('/')[0];
    navigate(`/coordi/2/${parsing}/${selectedItem.id}`);
  };

  // 아이템 선택 시 해당 아이템을 삭제
  const handleClickDeleteItem = (selectedItem: ClosetCloth) => {
    api
      .deleteCloth(selectedItem.id)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);
        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });

    handleClickOption(selectedItem.part);
  };

  // 내 옷장 조회
  const handleClickOption = (part: string) => {
    api
      .getClosets(part)
      .then((response) => {
        const data = response.data;

        setItemList(data);
        console.log(data);
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          loginStore.setLogout();
          navigate('/login');
        }
      });
  };

  return (
    <div className="">
      <div className="flex justify-end">
        <WhiteButton className="my-2 mr-2" value="전체" onClick={() => handleClickOption('')} />
        <WhiteButton className="my-2 mr-2" value="아우터" onClick={() => handleClickOption('outerCloth')} />
        <WhiteButton className="mx-2 my-2" value="상의" onClick={() => handleClickOption('upperBody')} />
        <WhiteButton className="mx-2 my-2" value="하의" onClick={() => handleClickOption('lowerBody')} />
        <WhiteButton className="mx-2 my-2" value="드레스" onClick={() => handleClickOption('dress')} />
        <Button className="my-2 ml-2" value="옷 등록" onClick={clickModal} />
      </div>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <MyClosetCreateForm onClose={closeModal} />
      </Modal>
      <br className="bg-gray-100 rounded-md " />
      <div className="">
        {ItemList.length == 0 ? (
          <div className="mx-4 my-20">
            <div className="my-20 text-center">해당 카테고리의 옷이 없습니다!</div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap my-2">
            <div className="flex">
              {ItemList.map((item, index) => (
                <MyClosetItem item={item} key={index} onClickItem={() => handleClickItem(item)} onClickDeleteItem={() => handleClickDeleteItem(item)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCloset;
