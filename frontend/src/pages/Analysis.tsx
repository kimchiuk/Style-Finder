import Navbar from '../widgets/header/Navbar';

import { Outlet } from 'react-router-dom';
import NestedNavbar from '../widgets/header/NestedNavbar';

const Analysis = () => {
  return (
    <>
      <Navbar></Navbar>
      <div  className="container mx-auto px-36">
        <NestedNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default Analysis;
