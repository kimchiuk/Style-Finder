import { useState } from 'react';

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={openModalHandler}> Open Modal</button>
      {isOpen ? (
        <div className="z-1" onClick={openModalHandler}>
          <div onClick={(e) => e.stopPropagation()}>
            <button onClick={openModalHandler}>클릭</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
