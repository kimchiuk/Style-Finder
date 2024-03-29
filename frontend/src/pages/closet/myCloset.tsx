import { useEffect, useState } from 'react';

import api from '../../entities/closet/closet-apis';
import { axiosError } from '../../shared/utils/axiosError';

const MyCloset = () => {
  const [selectedItem, setSelectedItem] = useState<string>('outer');

  const [ItemList, setItemList] = useState<string[]>([]);

  useEffect(() => {
    api
      .getClosets()
      .then((response) => {
        const data = response.data.data;

        data;
      })
      .catch((error) => {
        const errorCode = axiosError(error);

        if (errorCode == 401) {
          useLoginStore.setLogout();
          navigate('/login');
        }
      });
  });

  const handleClickItem = (part: string) => {
    setSelectedItem(part);
  };
  const handleOpenCreateClosetForm = () => {};
  const handleGetItems = (part: string) => {
    part;
  };

  return (
    <div className="p-2 m-2 bg-gray-100 rounded-lgs">
      <div>
        <button value="옷 등록" onClick={() => handleOpenCreateClosetForm} />
        <button value="아우터" onClick={() => handleGetItems('outer')} />
        <button value="상의" onClick={() => handleGetItems('upper')} />
        <button value="하의" onClick={() => handleGetItems('lower')} />
        <button value="드레스" onClick={() => handleGetItems('dress')} />
      </div>

      <div>
        {ItemList.map((item) => (
          <img
            className="p-2 m-2 rounded-lg"
            src={item}
            alt=""
            onClick={() => {
              handleClickItem('');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCloset;
