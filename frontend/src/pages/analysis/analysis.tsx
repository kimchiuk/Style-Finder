import Navbar from '../../widgets/nav/navbar';

import { Outlet } from 'react-router-dom';
import NestedNavbar from '../../widgets/nav/nested-navbar';

const Analysis = () => {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <NestedNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default Analysis;
