import Button from '../../shared/ui/button/button';

import closetApi from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';

import useLoginStore from '../../shared/store/use-login-store';
import { useNavigate } from 'react-router';
import { Cloth } from '../../entities/closet/closet-types';

interface MyClosetItemProps {
  item: Cloth;
  onClickItem(item: Cloth): void;
}

const MyClosetItem = (props: MyClosetItemProps) => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  // 아이템 선택 시 해당 아이템을 삭제
  const onClickDeleteItem = (selectedItem: Cloth) => {
    closetApi
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
  };

  return (
    <>
      <div>
        <img style={{ width: '200px', height: '200px' }} src={props.item.image}></img>
        <div className="flex">
          <Button style={{ width: '100px', height: '50px' }} value="코디 해 보기" onClick={() => props.onClickItem(props.item)} />
          <Button style={{ width: '100px', height: '50px' }} value="휴지통" onClick={() => onClickDeleteItem(props.item)} />
        </div>
      </div>
    </>
  );
};

export default MyClosetItem;
