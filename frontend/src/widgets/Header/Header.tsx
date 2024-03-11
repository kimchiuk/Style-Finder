import React from 'react';

import { Link } from 'react-router-dom';

import useLoginStore from '../../shared/store/useLoginStore';

const Header = () => {
  const loginStore = useLoginStore();

  return (
    <div className="fixed top-0 flex justify-between w-full h-16 bg-gray-200 navbar bg-base-100">
      <div className="navbar-start">
        <div className="flex">
          <Link to="/" replace={true}>
            <img className="w-10 h-10" src="" alt="" />
          </Link>
          <Link to="/" replace={true}>
            StyleFinder
          </Link>
        </div>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
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
          <a className="btn">
            <Link to="/login" replace={true}>
              {' '}
              Sign In{' '}
            </Link>
          </a>
        ) : (
          <a className="btn">
            <Link to="/" replace={true}>
              {' '}
              Sign Up{' '}
            </Link>
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
