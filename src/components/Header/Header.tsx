import React from 'react';
import { Button, Flexbox, Input, ClearButton } from './styled';

const Header = () => {
  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <Flexbox justifyContent="space-between">
      <Flexbox>
        <Button> &#8962;</Button>
        <Input />
      </Flexbox>
      <div>Trello </div>
      <div>
        <ClearButton onClick={clearLocalStorage}>
          Clear LocalStorage
        </ClearButton>
        🛈
        <Button>&#43;</Button>🛈
        <Button>&#9432;🛈</Button>
        <Button>&#128276;</Button>🛈🛈🛈🛈
      </div>
    </Flexbox>
  );
};

export default Header;
