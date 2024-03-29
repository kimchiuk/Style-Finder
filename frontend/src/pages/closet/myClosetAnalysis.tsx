import Image from '../../assets/images/aimodel.png';
import Button from '../../shared/ui/button/button';

const myClosetAnalysis = () => {
  return (
    <>
      <div>
        <img id="myClosetAnalysis" src={Image}>
          <Button value="outer"></Button>
          <Button value="upper"></Button>
          <Button value="lower"></Button>
          <Button value="dress"></Button>
        </img>
      </div>
    </>
  );
};

export default myClosetAnalysis;
