import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLoginStore from '../shared/store/useLoginStore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [height, setHeight] = useState(''); // 추가: 키 상태
  const [weight, setWeight] = useState(''); // 추가: 몸무게 상태
  
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  const [heightValid, setHeightValid] = useState(true); // 추가: 키 유효성 상태
  const [weightValid, setWeightValid] = useState(true); // 추가: 몸무게 유효성 상태
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = 
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)){
      setEmailValid(true);
    }else{
      setEmailValid(false);
    }
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex = 
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/;
    if(regex.test(pw)){
      setPwValid(true);
    }else{
      setPwValid(false);
    }
  };

  const handleConfirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/;
    
    // 비밀번호 확인 값이 일치하는지 확인
    if (e.target.value === pw && regex.test(e.target.value)) {
      setConfirmPwValid(true);
    } else {
      setConfirmPwValid(false);
    }
  };
  
  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 키 유효성 검사 로직 추가 (숫자만 허용)
    const isValid = /^[0-9]*$/.test(value) && value.length > 0;
    setHeight(value);
    setHeightValid(isValid);
  };
  
  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 몸무게 유효성 검사 로직 추가 (숫자만 허용)
    const isValid = /^[0-9]*$/.test(value) && value.length > 0;
    setWeight(value);
    setWeightValid(isValid);
  };
  

  const onClickConfirmButton = () => {
    // 회원가입 로직
    if (emailValid && pwValid && confirmPwValid && heightValid && weightValid) {
      // 회원가입 성공 로직
      alert('회원가입 성공');
      
      // 로그인 페이지로 리디렉션
      navigate('/login');
    } else {
      // 회원가입 실패 로직
      alert('회원가입 실패');
    }
  };


  useEffect(() => {
    // Enable or disable confirm button based on input validations
    if (emailValid && pwValid && confirmPwValid && heightValid && weightValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid, confirmPwValid, heightValid, weightValid]);


  return (
    <div className="flex justify-center">
      {!loginStore.isLogin ? (
        <div className="flex justify-center box-border h-72 w-2/3 p-4 border-4">
          <div className="contentWrap">
            <div className="inputTitle">이메일 주소</div>
            <div className="inputWrap">
              <input 
                className="input" 
                placeholder="이메일 입력" 
                value={email}
                onChange={handleEmail}
              />
            </div>
            {/* Email validation error message */}
            <div className="errorMessageWrap">
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해 주세요.</div>
              )}
            </div>
            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input 
                type='password'
                className="input" 
                placeholder="비밀번호 입력"
                value={pw}
                onChange={handlePw}
              />
            </div>
            {/* Password validation error message */}
            <div className="errorMessageWrap">
              {!pwValid && pw.length > 0 && (
                <div>올바른 비밀번호를 입력해주세요.</div>
              )}
            </div>
            <div className="inputTitle">비밀번호 확인</div>
            <div className="inputWrap">
              <input 
                type='password'
                className="input" 
                placeholder="비밀번호 확인"
                value={confirmPw}
                onChange={handleConfirmPw}
              />
            </div>
            {/* Confirm Password validation error message */}
            <div className="errorMessageWrap">
              {!confirmPwValid && confirmPw.length > 0 && (
                <div>비밀번호가 일치하지 않습니다.</div>
              )}
            </div>
            <div className="inputTitle">키</div>
            <div className="inputWrap">
              <input
                className="input"
                placeholder="키 입력"
                value={height}
                onChange={handleHeight}
              />
            </div>
            {/* 키 유효성 에러 메시지 */}
            <div className="errorMessageWrap">
              {!heightValid && height.length > 0 && (
                <div>올바른 키를 입력해 주세요.</div>
              )}
            </div>
            <div className="inputTitle">몸무게</div>
            <div className="inputWrap">
              <input
                className="input"
                placeholder="몸무게 입력"
                value={weight}
                onChange={handleWeight}
              />
            </div>
            {/* 몸무게 유효성 에러 메시지 */}
            <div className="errorMessageWrap">
              {!weightValid && weight.length > 0 && (
                <div>올바른 몸무게를 입력해 주세요.</div>
              )}
            </div>
            <div>
              <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                확인
              </button>
            </div>
            {/* Link to login page */}
            <Link to="/login">
              <div>로그인 페이지로 이동</div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Redirect to home or other page for logged-in users */}
          <div>이미 로그인 되어 있습니다.</div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
