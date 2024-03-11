import React, { useEffect } from 'react';

import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';
import AnalysisNavBar from '../widgets/AnalysisNavBar/AnalysisNavBar';

import { Outlet } from 'react-router-dom';

const AnalysisPage = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  // useEffect(() => {
  //   history.push('/analysis/myinfo');
  // }, []);

  return (
    <div>
      <AnalysisNavBar />
      <Outlet />
    </div>
  );
};

export default AnalysisPage;
