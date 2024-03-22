import { Feed } from '../../../shared/types/feed';
import InputBar from '../../../shared/ui/input/InputBar';
import TextArea from '../../../shared/ui/input/TextArea';

interface FeedProps extends Feed {
  onClick(): void;
}

const FeedItem = (props: FeedProps) => {
  return (
    <div>
      <InputBar label={'id'} value=""></InputBar>
      <InputBar label={'title'} value=""></InputBar>
      <TextArea label={'content'} value=""></TextArea>
      <InputBar label={'date'} value=""></InputBar>
      <InputBar label={'writer'} value={props.writer.toString()}></InputBar>
    </div>
  );
};

export default FeedItem;
