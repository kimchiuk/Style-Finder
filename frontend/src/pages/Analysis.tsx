import { Outlet } from 'react-router-dom';

import NestedNavbar from '../widgets/header/NestedNavbar';

const Analysis = () => {
  return (
    <div>
      <NestedNavbar />
      <Outlet />
    </div>
  );
};

export default Analysis;
