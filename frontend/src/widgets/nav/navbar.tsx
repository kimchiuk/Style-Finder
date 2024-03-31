import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // useEffect 추가
import useLoginStore from '../../shared/store/use-login-store';
import logo from '../../assets/logos/logo.png';

const Navbar = () => {
  const loginStore = useLoginStore();
  const [userNickname, setUserNickname] = useState('');

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로그아웃 처리
    loginStore.setLogout();
    localStorage.removeItem('isLoggedIn');
    setUserNickname(''); // 사용자 닉네임 초기화
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보를 가져옴
  useEffect(() => {
    const storedUserNickname = localStorage.getItem('userNickname');
    if (storedUserNickname) {
      setUserNickname(storedUserNickname);
    }
  }, []);

  return (
    <div className="navbar flex flex-row h-20 bg-[#161A30]">
      <div className="navbar-start flex items-center justify-center bg-[#F0ECE5] rounded-full m-5 w-36">
        <div className="logo flex items-center">
          <Link to="/" replace={true}>
            <img className="w-10 h-10" src={logo} alt="" />
          </Link>
          <Link to="/" replace={true} className="ml-2">
            StyleFinder
          </Link>
        </div>
      </div>

      <div className="navbar-center flex items-center justify-center flex-grow m-5">
        <div className="flex justify-between menu menu-sm dropdown-content mt-3 z-[1] p-2 m-5  bg-[#F0ECE5] rounded-full w-1/2">
          <Link to="/coordi" replace={true} className="mr-8">
            코디
          </Link>
          <Link to="/feed" replace={true} className="mr-8">
            피드
          </Link>
          <Link to="/analysis" replace={true}>
            분석
          </Link>
        </div>
      </div>

      <div className="navbar-end flex items-center justify-center text-center m-5 bg-[#F0ECE5] rounded-full w-20">
        {!loginStore.isLogin ? (
          <Link to="/login" replace={true} className="mr-2">
            로그인
          </Link>
        ) : (
          <div className="flex flex items-center justify-center">
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
