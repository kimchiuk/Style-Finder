import React, { useState, useEffect } from 'react';
import useLoginStore from '../shared/store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../widgets/header/Navbar';
import Footer from '../widgets/Footer/Footer';

const SignUp = () => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  const [heightValid, setHeightValid] = useState(true);
  const [weightValid, setWeightValid] = useState(true);
  const [notAllow, setNotAllow] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid && confirmPwValid && heightValid && weightValid && nickname && gender && image));
  }, [emailValid, pwValid, confirmPwValid, heightValid, weightValid, nickname, gender, image]);

  const validateEmail = (email: string) => {
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // 최소 8자 이상, 최소 1개의 문자, 숫자, 특수 문자를 포함해야 함
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;
    return regex.test(password);
  };
  

  const validateNumber = (value: string) => {
    return /^[0-9]*$/.test(value) && value.length > 0;
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw(value);
    setPwValid(validatePassword(value));
  };

  const handleConfirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPw(value);
    setConfirmPwValid(value === pw && validatePassword(value));
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value);
    setHeightValid(validateNumber(value));
  };

  const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value);
    setWeightValid(validateNumber(value));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const onClickConfirmButton = () => {
    if (!notAllow) {
      alert('회원가입 성공');
      navigate('/login');
    } else {
      setError('입력한 정보를 다시 확인해주세요.');
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="flex justify-center h-full">
      {!loginStore.isLogin ? (
        <div className="flex justify-center box-border w-2/3 p-4 border-4 overflow-y-auto">
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
            <div className="inputTitle">닉네임</div>
            <div className="inputWrap">
              <input
                className="input"
                placeholder="닉네임 입력"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                />
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
            <div className="inputTitle">키</div>
            <div className="inputWrap">
              <input
                className="input"
                placeholder="키 입력"
                value={height}
                onChange={handleHeight}
                />
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
            <div className="inputTitle">성별</div>
            <div className="inputWrap">
              <select
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="">성별 선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <div className="inputTitle">프로필 이미지 업로드</div>
            <div className="inputWrap">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                />
            </div>
            <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
              확인
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      ) : (
        <div>
          <div>이미 로그인 되어 있습니다.</div>
        </div>
      )}
    </div>
    <Footer></Footer>
      </>
  );
};

export default SignUp;
