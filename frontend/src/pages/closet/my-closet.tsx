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

const MyCloset = () => {
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const [ItemList, setItemList] = useState<Cloth[]>([]);

  useEffect(() => {
    getClosets('');
  }, []);

  const handleClickOption = (selectedPart: string) => {
    getClosets(selectedPart);
  };

  // 해당 아이템 코디 해 보기
  const handleClickItem = (selectedItem: Cloth) => {
    navigate(`/coordi/1/${selectedItem.id}`);
  };

  // 내 옷장 조회
  const getClosets = (selectedPart: string) => {
    api
      .getClosets(selectedPart)
      .then((response) => {
        const data = response.data.data;

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
    <div className="p-2 m-2 bg-gray-100 rounded-lgs">
      <div>
        <Button value="옷 등록" onClick={clickModal} />

        <Modal isOpen={isOpenModal} onClose={closeModal}>
          <div>옷 저장</div>
          <MyClosetCreateForm />
        </Modal>

        <Button value="전체" onClick={() => handleClickOption('')} />
        <Button value="아우터" onClick={() => handleClickOption('아우터')} />
        <Button value="상의" onClick={() => handleClickOption('상의')} />
        <Button value="하의" onClick={() => handleClickOption('하의')} />
        <Button value="드레스" onClick={() => handleClickOption('드레스')} />
      </div>
      <div className="flex flex-wrap">
        {ItemList.map((item, index) => (
          <MyClosetItem key={index} item={item} onClickItem={() => handleClickItem(item)} />
        ))}
      </div>
    </div>
  );
};

export default MyCloset;
