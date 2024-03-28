import Button from '../../shared/ui/button/Button';

const myCloset = () => {
  const handleOpenCreateClosetForm = () => {};
  const handleGetItems = (part: string) => {
    part;
  };

  return (
    <>
      <div>
        <Button value="옷 등록" onClick={() => handleOpenCreateClosetForm} />
      </div>
      <div>
        <Button value="아우터" onClick={() => handleGetItems('outer')} />
        <Button value="상의" onClick={() => handleGetItems('upper')} />
        <Button value="하의" onClick={() => handleGetItems('lower')} />
        <Button value="드레스" onClick={() => handleGetItems('dress')} />
      </div>
    </>
  );
};

export default myCloset;
