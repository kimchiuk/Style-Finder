import FeedItem from '../../feedItems/ui/feedItem';
import Button from '../../../shared/ui/button/Button';
import CoordiScreen from './coordiScreen';

import { Coordi } from '../../../shared/types/coordi';
import { Feed } from '../../../shared/types/feed';

interface PostProps {
  feed: Feed;
  coordi: Coordi;
}

const CoordiForm = (props: PostProps) => {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };

  return (
    <div>
      <form>
        <CoordiScreen {...props.coordi}></CoordiScreen>
        <FeedItem onClick={handleClick} {...props.feed}></FeedItem>

        <Button value="피드 등록" onClick={handleClick} />
        <Button value="카카오톡 공유" onClick={handleClick} />
      </form>
    </div>
  );
};

export default CoordiForm;
