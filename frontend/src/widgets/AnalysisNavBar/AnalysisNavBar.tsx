import React from 'react';
import { Link } from 'react-router-dom';

const AnalysisNavBar = () => {
  return (
    <div className="flex w-30% h-16 justify-center bg-gray-200 navbar bg-base-100">
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to="/analysis/myinfo" replace={true}>
              내 옷장
            </Link>
          </li>
          <li>
            <Link to="/analysis/recommendation" replace={true}>
              코디 추천
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalysisNavBar;
