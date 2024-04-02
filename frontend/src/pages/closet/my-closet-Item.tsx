import Button from '../../shared/ui/button/button';

// import closetApi from '../../entities/closet/closet-apis';
// import { axiosError } from '../../shared/utils/axiosError';

// import useLoginStore from '../../shared/store/use-login-store';
// import { useNavigate } from 'react-router';
import { Cloth } from '../../entities/closet/closet-types';
import WhiteButton from '../../shared/ui/button/white-button';

interface MyClosetItemProps {
  item: Cloth;
  onClickItem(item: Cloth): void;
}

const MyClosetItem = (props: MyClosetItemProps) => {
  // const navigate = useNavigate();
  // const loginStore = useLoginStore();

  // 아이템 선택 시 해당 아이템을 삭제
  const onClickDeleteItem = (selectedItem: Cloth) => {
    // 조회 시 삭제에 활용되는 pk인 cloth id 를 받아오지 않아서 삭제 못함
    selectedItem;
    // closetApi
    //   .deleteCloth(selectedItem.id)
    //   .then((response) => {
    //     const data = response.data.data;
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     const errorCode = axiosError(error);
    //     if (errorCode == 401) {
    //       loginStore.setLogout();
    //       navigate('/login');
    //     }
    //   });
  };

  return (
    <>
      <div className="mx-4 my-2">
        <img className="w-64 h-64" src={props.item.image}></img>
        <div className="flex">
          <Button className="w-40 h-16" value="코디 해 보기" onClick={() => props.onClickItem(props.item)} />
          <WhiteButton className="w-24 h-16" value="휴지통" onClick={() => onClickDeleteItem(props.item)} />
        </div>
      </div>
    </>
  );
};

export default MyClosetItem;
