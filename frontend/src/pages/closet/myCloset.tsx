const myCloset = () => {
  const handleOpenCreateClosetForm = () => {};
  const handleGetItems = (part: string) => {
    part;
  };

  return (
    <>
      <div>
        <button value="옷 등록" onClick={() => handleOpenCreateClosetForm} />
      </div>
      <div>
        <button value="아우터" onClick={() => handleGetItems('outer')} />
        <button value="상의" onClick={() => handleGetItems('upper')} />
        <button value="하의" onClick={() => handleGetItems('lower')} />
        <button value="드레스" onClick={() => handleGetItems('dress')} />
      </div>
    </>
  );
};

export default myCloset;
