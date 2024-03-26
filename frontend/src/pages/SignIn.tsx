import Navbar from '../widgets/header/Navbar';
import Footer from '../widgets/footer/Footer';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLoginStore from '../shared/store/useLoginStore';
//import useUserStore from '../shared/store/useUserStore';

const User = {
  email: 'test@example.com',
  pw: 'test2323@',
};

const SignIn = () => {
  const loginStore = useLoginStore();
  //const userStore = useUserStore();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(email));
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPw(newPassword);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;
    setPwValid(regex.test(newPassword));
  };

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      // 로그인 성공 시 로컬 스토리지에 로그인 정보 저장
      localStorage.setItem('isLoggedIn', 'true');
      loginStore.setLogin();
      alert('로그인 성공');
    } else {
      alert('등록되지 않은 사용자입니다.');
    }
  };

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid));
  }, [emailValid, pwValid]);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center">
        {!loginStore.isLogin ? (
          <div className="box-border flex justify-center w-2/3 p-4 border-4 h-72">
            <div className="contentWrap">
              <div className="inputTitle">이메일 주소</div>
              <div className="inputWrap">
                <input className="input" placeholder="이메일 입력" value={email} onChange={handleEmail} />
              </div>
              <div className="errorMessageWrap">{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해 주세요.</div>}</div>
              <div className="inputTitle">비밀번호</div>
              <div className="inputWrap">
                <input type="password" className="input" placeholder="비밀번호 입력" value={pw} onChange={handlePw} />
              </div>
              <div className="errorMessageWrap">{!pwValid && pw.length > 0 && <div>올바른 비밀번호를 입력해주세요.</div>}</div>
              <div>
                <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                  확인
                </button>
                <Link to="/signup">
                  <div>회원가입</div>
                </Link>
              </div>
              <Link to="/feed">
                <div>피드로 이동하기</div>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/feed"></Link>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};
export default SignIn;
