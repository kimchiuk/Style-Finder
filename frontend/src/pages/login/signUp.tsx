import React, { useState, useEffect } from 'react';
import useLoginStore from '../../shared/store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../widgets/nav/navbar';
import './signup.css';

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

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleOptionRemove = (option: string) => {
    setSelectedOptions(selectedOptions.filter(item => item !== option));
  };


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
      <div className="flex justify-center h-full ">
        {!loginStore.isLogin ? (
          <div className=" box-border w-2/5 p-4 border-4 overflow-y-auto rounded-lg bg-[#F5F5F5] mt-5">
            <div className='flex justify-between'>
              <div>
                <div className="inputWrap mb-5">
                  <input className="input" placeholder="이메일 입력" value={email} onChange={handleEmail} />
                </div>
                <div className="inputWrap mb-5">
                  <input className="input" placeholder="닉네임 입력" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className="inputWrap mb-5">
                  <input type="password" className="input" placeholder="비밀번호 입력" value={pw} onChange={handlePw} />
                </div>
                <div className="inputWrap mb-5">
                  <input type="password" className="input" placeholder="비밀번호 확인" value={confirmPw} onChange={handleConfirmPw} />
                </div>
                <div className='flex flex-row'>
                  <div>
                    <div className="inputWrap mr-5 mb-5">
                      <input className="input w-16 mr-2" placeholder="키 입력" value={height} onChange={handleHeight} />cm
                    </div>
                  </div>
                  <div>
                    <div className="inputWrap">
                      <input className="input w-24 mr-2" placeholder="몸무게 입력" value={weight} onChange={handleWeight} />kg
                    </div>
                  </div>
                </div>
                <div className="inputWrap mb-5">
                  <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">성별 선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
                <div className="inputTitle mb-2">프로필 이미지 업로드</div>
                <div className="inputWrap mb-5 customInputWrap">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="customFileInput" />
                </div>

              </div>
              <div className='w-1/2'>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleSelectChange}>
                  <option disabled selected>당신의 취향을 골라주세요</option>
                  <option value="재킷">재킷</option>
                  <option value="조거팬츠">조거팬츠</option>
                  <option value="짚업">짚업</option>
                  <option value="스커트">스커트</option>
                  <option value="가디건">가디건</option>
                  <option value="점퍼">점퍼</option>
                  <option value="티셔츠">티셔츠</option>
                  <option value="셔츠">셔츠</option>
                  <option value="팬츠">팬츠</option>
                  <option value="드레스">드레스</option>
                  <option value="패딩">패딩</option>
                  <option value="청바지">청바지</option>
                  <option value="점프수트">점프수트</option>
                  <option value="니트웨어">니트웨어</option>
                  <option value="베스트">베스트</option>
                  <option value="코트">코트</option>
                  <option value="브라탑">브라탑</option>
                  <option value="블라우스">블라우스</option>
                  <option value="탑">탑</option>
                  <option value="후드티">후드티</option>
                  <option value="래깅스">래깅스</option>
                </select>

                {/* 선택된 옵션들 표시 */}
                {selectedOptions.length > 0 && (
                  <div>
                    <p className='flex justify-center mt-3'>선택된 옵션들</p>
                    {selectedOptions.reduce((rows: string[][], option, index) => {
                      if (index % 2 === 0) rows.push([] as string[]);
                      rows[rows.length - 1].push(option);
                      return rows;
                    }, []).map((row, rowIndex) => (
                      <div className="option-box-container flex justify-between" key={rowIndex}>
                        {row.map(option => (
                          <div className="option-box" key={option}>
                            {option}
                            <button className="option-button" onClick={() => handleOptionRemove(option)}>취소</button>
                          </div>
                        ))}
                      </div>
                    ))}

                  </div>

                )}
              </div>
            </div>
            <div className='flex justify-center'>
              <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                회원가입
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
    </>
  );
};

export default SignUp;
