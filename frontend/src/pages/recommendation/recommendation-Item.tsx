import Button from '../../shared/ui/button/button';

interface RecommendationItemProps {
  id: string;
  image: string;
  handleClickMoveToCoordi(): void;
}

const RecommendationItem = (props: RecommendationItemProps) => {
  return (
    <>
      <img style={{ width: '200px', height: '200px' }} src={props.image} alt="" />
      <Button style={{ width: '200px', height: '50px' }} onClick={props.handleClickMoveToCoordi} value="코디 해 보기" />
    </>
  );
};

export default RecommendationItem;
