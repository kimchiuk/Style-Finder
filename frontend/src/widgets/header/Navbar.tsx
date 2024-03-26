import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // useEffect 추가
import useLoginStore from '../../shared/store/useLoginStore';
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
    <div className="navbar bg-[#d1d5db]">
      <div className="navbar-start flex items-center">
        <div className="logo flex items-center">
          <Link to="/" replace={true}>
            <img className="w-10 h-10" src={logo} alt="" />
          </Link>
          <Link to="/" replace={true} className="ml-2">
            StyleFinder
          </Link>
        </div>
      </div>

      <div className="navbar-center flex items-center justify-center flex-grow">
        <div className="flex justify-between">
          <Link to="/coordi" replace={true} className='mr-8'>
            코디
          </Link>
          <Link to="/feed" replace={true} className='mr-8'>
            피드
          </Link>
          <Link to="/analysis" replace={true}>
            분석
          </Link>
        </div>
      </div>

      <div className="navbar-end flex items-center">
        {!loginStore.isLogin ? (
          <Link to="/login" replace={true} className="mr-2">
            로그인
          </Link>
        ) : (
          <div className="flex items-center">
            <button onClick={handleLogout} className='mr-3'>로그아웃</button>
            <span className="mr-2">{userNickname}님</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
