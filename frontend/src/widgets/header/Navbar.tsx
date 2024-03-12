import { Link } from 'react-router-dom';

import useLoginStore from '../../shared/store/useLoginStore';
import logo from '../../assets/logos/logo.png';
const Navbar = () => {
  const loginStore = useLoginStore();

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
        {!loginStore.isLogin ? (
          <Link to="/login" replace={true}>
            Sign In
          </Link>
        ) : (
          <Link to="/" replace={true}>
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
