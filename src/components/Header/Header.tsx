import React from 'react';
import { Button, Flexbox, Input } from './styled';

function Header() {
  return (
    <Flexbox justifyContent="space-between">
      <Flexbox>
        <Button> &#8962;</Button>
        <Input />
      </Flexbox>
      <div>Trello </div>
      <div>
        <Button>&#43;</Button>🛈
        <Button>&#9432;🛈</Button>
        <Button>&#128276;</Button>🛈🛈🛈🛈
      </div>
    </Flexbox>
  );
}

export default Header;
