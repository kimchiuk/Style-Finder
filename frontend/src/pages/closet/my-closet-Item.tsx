import Button from '../../shared/ui/button/button';

import closetApi from '../../entities/closet/closet-apis';
// import coordiApi from '../../entities/coordi/coordi-apis';
import { axiosError } from '../../shared/utils/axiosError';

import useLoginStore from '../../shared/store/use-login-store';
import { useNavigate } from 'react-router';

interface MyClosetItemProps {
  index: number;
  image: string;
}

const MyClosetItem = (props: MyClosetItemProps) => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  // 아이템 선택 시 해당 아이템을 코디 해 보기
  const onClickMoveToCoordi = (index: number) => {
    index;
  };

  // 아이템 선택 시 해당 아이템을 삭제
  const onClickDeleteItem = (index: number) => {
    closetApi
      .deleteCloth(index)
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
        <img style={{ width: '200px', height: '200px' }} src={props.image}></img>
        <div className="flex">
          <Button style={{ width: '100px', height: '50px' }} value="코디 해 보기" onClick={() => onClickMoveToCoordi(props.index)} />
          <Button style={{ width: '100px', height: '50px' }} value="휴지통" onClick={() => onClickDeleteItem(props.index)} />
        </div>
      </div>
    </>
  );
};

export default MyClosetItem;
