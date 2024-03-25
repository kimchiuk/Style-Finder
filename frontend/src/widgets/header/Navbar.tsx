import { Link } from 'react-router-dom';
import useLoginStore from '../../shared/store/useLoginStore';
import logo from '../../assets/logos/logo.png';

const Navbar = () => {
  const loginStore = useLoginStore();

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로그아웃 처리
    loginStore.setLogout();
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="logo">
          <Link to="/" replace={true}>
            <img className="w-10 h-10" src={logo} alt="" />
          </Link>
          <Link to="/" replace={true}>
            StyleFinder
          </Link>
        </div>
      </div>
      <div className="navbar-center">
        <ul className="menu">
          <li>
            <Link to="/fitting" replace={true}>
              피팅
            </Link>
          </li>
          <li>
            <Link to="/feed" replace={true}>
              피드
            </Link>
          </li>
          <li>
            <Link to="/analysis" replace={true}>
              분석
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* 로그인 상태에 따라 로그인 또는 로그아웃 버튼 렌더링 */}
        {!loginStore.isLogin ? (
          <Link to="/login" replace={true}>
            로그인
          </Link>
        ) : (
          <button onClick={handleLogout}>로그아웃</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
