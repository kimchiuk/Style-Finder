import { useEffect, useState } from 'react';

import Image from '../../assets/images/aimodel.png';
import Image2 from '../../assets/images/main1.png';

import MyClosetItem from './my-closet-Item';
import MyClosetCreateForm from './my-closet-create-form';

import Button from '../../shared/ui/button/button';
import Modal from '../../shared/ui/modal/Modal';
import useOpenModal from '../../shared/hooks/use-open-modal';
import { useNavigate } from 'react-router';

import api from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';

const MyCloset = () => {
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const [selectedItem, setSelectedItem] = useState<string>('all');
  const [ItemList, setItemList] = useState<string[]>([Image, Image, Image, Image, Image, Image, Image, Image2, Image2]);

  useEffect(() => {});

  // 옷 변경
  const handleClickOption = (part: string) => {
    setSelectedItem(part);
    handleGetClosets();
  };

  // 내 옷장 조회
  const handleGetClosets = () => {
    // 일단은 전체 조회만 가능
    if (selectedItem != 'all') return;

    api
      .getClosets()
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

        <Button value="전체" onClick={() => handleClickOption('all')} />
        <Button value="아우터" onClick={() => handleClickOption('outer')} />
        <Button value="상의" onClick={() => handleClickOption('upper')} />
        <Button value="하의" onClick={() => handleClickOption('lower')} />
        <Button value="드레스" onClick={() => handleClickOption('dress')} />
      </div>
      <div className="flex flex-wrap">
        {ItemList.map((item, index) => (
          <MyClosetItem key={index} image={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyCloset;
