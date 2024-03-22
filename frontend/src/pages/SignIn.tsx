import { useEffect, useState } from 'react';
import useLoginStore from '../shared/store/useLoginStore';
import useUserStore from '../shared/store/useUserStore';

const User = {
  email : 'test@example.com',
  pw: 'test2323@@@'
}
// import useAxios from '../../hooks/useAxios';
// import api from '../../utils/axios';

import { Link } from 'react-router-dom';

const SignIn = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  // login axios 결과 값 받는 부분
  // const result = useAxios(api.getTest1, () => ({}));
  // console.log(result.response);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  
  const [emailValid, setEmailvalid] = useState(false);
  const [pwValid, setPwvalid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = 
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)){
      setEmailvalid(true);
    }else{
      setEmailvalid(false);
    }
  };
  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex = 
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;
    if(regex.test(pw)){
      setPwvalid(true);
    }else{
      setPwvalid(false);
    }
  };
  
  const onClickConfirButton = () => {
    if(email === User.email && pw === User.pw) {
      alert('로그인성공')
    }else{
      alert('등록안됨')
    }
  }

  useEffect(() => {
    if(emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <div className="flex justify-center">
      {!loginStore.isLogin ? (
        // 로그아웃 상태
        <div className="flex justify-center box-border h-72 w-2/3 p-4 border-4">
          <div className="contentWrap">
            <div className="inputTitle">이메일 주소</div>
            <div className="inputWrap">
              <input 
              className="input" 
              placeholder="이메일 입력" 
              value={email}
              onChange={handleEmail}/>
            </div>
            <div className="errorMessageWrap">
              {
                !emailValid && email.length > 0 && (
                  <div>올바른 이메일을 입력해 주세요.</div>
                )
              }
            </div>
            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input 
              type='password'
              className="input" 
              placeholder="비밀번호입력"
              value={pw}
              onChange={handlePw}/>
            </div>
            <div className="errorMessageWrap">
              {!pwValid && pw.length > 0 && (
                <div>올바른 비밀번호를 입력해주세요.</div>
              )}
            </div>
            <div>
              <button onClick={onClickConfirButton} disabled={notAllow} className="bottomButton">
                확인
              </button>
              <Link to="/signup">
                <div>회원가입</div>
              </Link>
            </div>
            <Link to="/">
              <div>홈으로 돌아가기</div>
            </Link>
          </div>
        </div>
      ) : (
        // 로그인 상태`
        <div>
          <div>로그인</div>
          <div>id: {userStore.id}</div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
