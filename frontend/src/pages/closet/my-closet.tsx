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
import { Cloth } from '../../entities/closet/closet-types';
import WhiteButton from '../../shared/ui/button/white-button';

const MyCloset = () => {
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const [ItemList, setItemList] = useState<Cloth[]>([{ image: 'image', part: 'outer', category: [], details: [], textures: [] }]);

  useEffect(() => {
    getClosets('outerCloth');
  }, []);

  const handleClickOption = (selectedPart: string) => {
    getClosets(selectedPart);
  };

  // 해당 아이템 코디 해 보기
  const handleClickItem = (selectedItem: Cloth) => {
    selectedItem;
    //navigate(`/coordi/1/${selectedItem.id}`);
  };

  // 내 옷장 조회
  const getClosets = (part: string) => {
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
    <div className="p-2 m-2 rounded-lgs">
      <div className="flex justify-end">
        <WhiteButton className="my-2 mr-2" value="아우터" onClick={() => handleClickOption('outerCloth')} />
        <WhiteButton className="mx-2 my-2" value="상의" onClick={() => handleClickOption('upperBody')} />
        <WhiteButton className="mx-2 my-2" value="하의" onClick={() => handleClickOption('lowerBody')} />
        <WhiteButton className="mx-2 my-2" value="드레스" onClick={() => handleClickOption('dress')} />
        <Button className="my-2 ml-2" value="옷 등록" onClick={clickModal} />
      </div>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <MyClosetCreateForm onClose={closeModal} />
      </Modal>
      <div className="flex flex-wrap">
        {ItemList.map((item, index) => (
          <MyClosetItem key={index} item={item} onClickItem={() => handleClickItem(item)} />
        ))}
      </div>
    </div>
  );
};

export default MyCloset;
