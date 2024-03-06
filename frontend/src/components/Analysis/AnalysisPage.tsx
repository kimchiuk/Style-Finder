import React from 'react'

import useLoginStore from '../../store/login';
import useUserStore from '../../store/user'

import { Link } from 'react-router-dom';

const AnalysisPage = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  return (
    <div>
      {!loginStore.isLogin? (
        // 로그아웃 상태
        <div>
          분석 페이지
          <Link to="/">
            <div>홈으로 돌아가기</div>
          </Link>
        </div>
      ) : (
        // 로그인 상태 
        <div>
          분석 페이지
          id : {userStore.id}
        </div>
      )}
    </div>
  )
}

export default AnalysisPage