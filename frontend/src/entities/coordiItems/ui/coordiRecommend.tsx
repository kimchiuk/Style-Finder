import Button from '../../../shared/ui/button/Button';
import { Keywords } from '../../../shared/types/coordi';

const CoordiRecommend = (props: Keywords) => {
  const onClickKeyword = () => {};

  return (
    <div>
      <div>추천해요!</div>
      {props.keyword.map((item) => (
        <Button value={item} onClick={onClickKeyword} />
      ))}
    </div>
  );
};

export default CoordiRecommend;
