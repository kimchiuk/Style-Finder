import React, { useCallback, useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';

// 본인 코디 데이터 + 선호 카테고리 + 내 옷장 데이터
const Keywords = () => {
  const [totalValue, setTotalValue] = useState(100);

  const datas = [
    { text: '재킷', value: 10 },
    { text: '조거팬츠', value: 10 },
    { text: '짚업', value: 10 },
    { text: '스커트', value: 10 },
    { text: '가디건', value: 100 },
    { text: '점퍼', value: 10 },
    { text: '티셔츠', value: 10 },
    { text: '셔츠', value: 10 },
    { text: '팬츠', value: 10 },
    { text: '드레스', value: 10 },
    { text: '패딩', value: 10 },
    { text: '청바지', value: 10 },
    { text: '점프수트', value: 10 },
    { text: '니트웨어', value: 10 },
    { text: '베스트', value: 10 },
    { text: '코트', value: 10 },
    { text: '브라탑', value: 10 },
    { text: '블라우스', value: 10 },
    { text: '탑', value: 10 },
    { text: '후드티', value: 10 },
    { text: '래깅스', value: 10 },
    { text: '레트로', value: 10 },
    { text: '로맨틱', value: 10 },
    { text: '리조트', value: 10 },
    { text: '매니시', value: 10 },
    { text: '모던', value: 10 },
    { text: '밀리터리', value: 10 },
    { text: '섹시', value: 10 },
    { text: '소피스트케이티드', value: 10 },
    { text: '스트리트', value: 10 },
    { text: '스포티', value: 10 },
    { text: '아방가르드', value: 10 },
    { text: '오리엔탈', value: 10 },
    { text: '웨스턴', value: 10 },
    { text: '젠더리스', value: 10 },
    { text: '컨트리', value: 10 },
    { text: '클래식', value: 10 },
    { text: '키치', value: 10 },
    { text: '톰보이', value: 10 },
    { text: '펑크', value: 10 },
    { text: '페미닌', value: 10 },
    { text: '프레피', value: 10 },
    { text: '히피', value: 10 },
    { text: '힙합', value: 10 },
  ];

  useEffect(() => {
    let value = 0;

    datas.forEach((data) => {
      value += data.value;
    });

    setTotalValue(value);
  }, []);

  return (
    <div>
      <WordCloud data={datas} width={500} height={200} font="Times" fontWeight="bold" spiral="rectangular" rotate={(word) => word.value % 1} fontSize={(word) => Math.log2(word.value) * 5} />
    </div>
  );
};

export default Keywords;
