import { Link } from 'react-router-dom';

const NestedNavbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-center">
        <ul className="menu">
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

export default NestedNavbar;
