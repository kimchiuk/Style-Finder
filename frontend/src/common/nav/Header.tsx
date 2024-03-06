import React from 'react';

import { Link } from 'react-router-dom';

import useLoginStore from '../../store/login';

import './Header.css'; // 스타일 파일을 import합니다.

const Header = () => {
  const loginStore = useLoginStore();
  
  return (
    <nav className="header-container">
      <div className="nav-logo">
        <Link to="/"> 홈 </Link>
      </div>

      <div className="nav-menu">
        <Link to="/fitting"> 피팅 </Link>
        |
        <Link to="/feed"> 피드 </Link>
        |
        <Link to="/analysis"> 분석 </Link>
      </div>
      
      {!loginStore.isLogin ? (
        <div className="nav-login">
          <Link to="/login"> 로그인 </Link>
        </div>
      ) : (
        <div className="nav-logout">
          <Link to="/"> 로그아웃 </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;