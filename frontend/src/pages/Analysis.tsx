import Navbar from '../widgets/header/Navbar';

import { Outlet } from 'react-router-dom';

import NestedNavbar from '../widgets/header/NestedNavbar';

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
