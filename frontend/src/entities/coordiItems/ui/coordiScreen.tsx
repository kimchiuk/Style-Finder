import { useState } from 'react';
import { Coordi } from '../../../shared/types/coordi';
import Button from '../../../shared/ui/button/Button';

const CoordiScreen = (props: Coordi) => {
  const [color, setColor] = useState('white');

  const [hair, setHair] = useState(props.hair.image);
  const [top, setTop] = useState(props.top.image);
  const [bottom, setBottom] = useState(props.bottom.image);
  const [shoes, setShoes] = useState(props.shoes.image);

  const handleChangeImageHair = (newHair: string) => {
    setHair(newHair);
  };

  const handleChangeImageTop = (newTop: string) => {
    setTop(newTop);
  };

  const handleChangeImageBottom = (newBottom: string) => {
    setBottom(newBottom);
  };

  const handleChangeImageShoes = (newShoes: string) => {
    setShoes(newShoes);
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleChangeColor('white')} value={'🤍'} />
        <Button onClick={() => handleChangeColor('red')} value={'💗'} />
        <Button onClick={() => handleChangeColor('orange')} value={'🧡'} />
        <Button onClick={() => handleChangeColor('yellow')} value={'💛'} />
        <Button onClick={() => handleChangeColor('green')} value={'💚'} />
        <Button onClick={() => handleChangeColor('blue')} value={'💙'} />
        <Button onClick={() => handleChangeColor('violet')} value={'💜'} />
        <Button onClick={() => handleChangeColor('black')} value={'🖤'} />
      </div>
      <div className="p-10" style={{ background: color }}>
        <div className="flex">
          <img className="p-2 m-2 bg-gray-200 rounded-lg" src={hair} alt="" onChange={() => handleChangeImageHair(props.hair.image)} />
          <img className="p-2 m-2 bg-gray-200 rounded-lg" src={top} alt="" onChange={() => handleChangeImageTop(props.top.image)} />
        </div>
        <div className="flex">
          <img className="p-2 m-2 bg-gray-200 rounded-lg" src={bottom} alt="" onChange={() => handleChangeImageBottom(props.bottom.image)} />
          <img className="p-2 m-2 bg-gray-200 rounded-lg" src={shoes} alt="" onChange={() => handleChangeImageShoes(props.shoes.image)} />
        </div>
      </div>
    </div>
  );
};

export default CoordiScreen;
