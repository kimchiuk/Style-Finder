import useUserStore from '../../shared/store/use-user-store';

// import { ResponsivePieCanvas } from '@nivo/pie';

const My = () => {
  const userStore = useUserStore();

  return (
    <div>
      <div>id: {userStore.userId}</div>
      <div>내 정보</div>
      <div className="w-auto shadow-xl card bg-base-100">
        <div className="card-body">
          <div className="flex flex-row">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col ml-4">
              <div>닉네임 님</div>
              <div>키: 180 cm, 몸무게: 10 kg</div>
            </div>
          </div>
          <div>
            <div>선호 : </div>
            <div>비선호 : </div>
          </div>
        </div>
      </div>
      <div className="mt-6">당신의 취향은?</div>
      <div className="w-auto shadow-xl card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
      <div className="mt-6">당신의 옷장은?</div>
      <div className="w-auto shadow-xl card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
      <div className="mt-6">내 옷장</div>
      <div className="w-auto shadow-xl card bg-base-100">
        <div className="card-body">
          <div>여기는 어떻게 할껴?</div>
        </div>
      </div>
    </div>
  );
};

export default My;
