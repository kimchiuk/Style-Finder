import { useEffect, useState } from 'react';

import MyClosetItem from './my-closet-Item';

import { useNavigate } from 'react-router';

import api from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';
import { Cloth } from '../../entities/closet/closet-types';
import WhiteButton from '../../shared/ui/button/white-button';

const MyClosetReadModal = () => {
  const loginStore = useLoginStore();
  const navigate = useNavigate();

  const [ItemList, setItemList] = useState<Cloth[]>([]);

  useEffect(() => {
    getClosets('');
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
    <div className="p-2 m-2 rounded-lgs">
      <div className="flex justify-end">
        <WhiteButton className="my-2 mr-2" value="전체" onClick={() => handleClickOption('')} />
        <WhiteButton className="my-2 mr-2" value="아우터" onClick={() => handleClickOption('outerCloth')} />
        <WhiteButton className="mx-2 my-2" value="상의" onClick={() => handleClickOption('upperBody')} />
        <WhiteButton className="mx-2 my-2" value="하의" onClick={() => handleClickOption('lowerBody')} />
        <WhiteButton className="mx-2 my-2" value="드레스" onClick={() => handleClickOption('dress')} />
      </div>
      <div className="flex flex-row flex-wrap">
        {ItemList.map((item, index) => (
          <MyClosetItem key={index} item={item} onClickItem={() => handleClickItem(item)} />
        ))}
      </div>
    </div>
  );
};

export default MyClosetReadModal;
