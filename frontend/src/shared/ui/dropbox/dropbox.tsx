import { useState } from 'react';
import styled from 'styled-components';

interface DropboxProps {
  options: string[];
  onSelected: (selectedItem: string) => void;
}

const DropdownDiv = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectedItem = styled.div`
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1;
`;

const DropdownItem = styled.div`
  white-space: nowrap;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Dropbox = (props: DropboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    props.onSelected(item);
  };

  return (
    <DropdownDiv>
      <SelectedItem onClick={() => setIsOpen(!isOpen)}>{selectedItem || '선택'}</SelectedItem>
      {isOpen && (
        <DropdownList>
          {props.options.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleItemClick(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownDiv>
  );
};

export default Dropbox;
