import { useEffect, useState } from 'react';

import MyClosetItem from './my-closet-Item';

import Button from '../../shared/ui/button/button';
import { useNavigate } from 'react-router';

import api from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';
import useLoginStore from '../../shared/store/use-login-store';
import { Cloth } from '../../entities/closet/closet-types';

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

export default MyClosetReadModal;
