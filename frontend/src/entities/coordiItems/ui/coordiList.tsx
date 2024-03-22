import { ClothesList } from '../../../shared/types/coordi';
import CoordiItem from './coordiItem';
import CoordiItems from './coordiItems';

const CoordiList = (props: ClothesList) => {
  const handleClickHair = () => {};
  const handleClickTop = () => {};
  const handleClickBottom = () => {};
  const handleClickShoes = () => {};

  return (
    <div>
      <div>머리</div>
      <div className="flex">
        <CoordiItem onClick={handleClickHair} {...props.coordi.hair} />
        <CoordiItems onClick={handleClickHair} {...(props.clothesList && props.clothesList[0])} />
        <div>🔄</div>
      </div>

      <div>상의</div>
      <div className="flex">
        <CoordiItem onClick={handleClickTop} {...props.coordi.top} />
        <CoordiItems onClick={handleClickTop} {...(props.clothesList && props.clothesList[1])} />
        <div>🔄</div>
      </div>

      <div>하의</div>
      <div className="flex">
        <CoordiItem onClick={handleClickBottom} {...props.coordi.bottom} />
        <CoordiItems onClick={handleClickBottom} {...(props.clothesList && props.clothesList[2])} />
        <div>🔄</div>
      </div>

      <div>신발</div>
      <div className="flex">
        <CoordiItem onClick={handleClickShoes} {...props.coordi.shoes} />
        <CoordiItems onClick={handleClickShoes} {...(props.clothesList && props.clothesList[3])} />
        <div>🔄</div>
      </div>
    </div>
  );
};

export default CoordiList;
